//import * as p5 from "./definitions/p5/index";
class World {
    constructor(worldID) {
        this.loaded = 0;
        this.loadCount = 1;
        this.actionBuffer = [];
        this.failed = false;
        this.TILE = {
            X: () => width / 10,
            Y: () => height / 10
        };
        loadJSON("/levels/" + worldID + "/data.json", json => { this.json = json; this.loadLevel(json, 0); }, () => this.failed = true);
        loadStrings("/levels/" + worldID + "/t_index.txt", index => {
            let desc = [];
            index.forEach(path => loadStrings("/levels/" + worldID + "/task/" + path, md => {
                desc.push(md.join("\n"));
                if (desc.length >= index.length) {
                    this.desc = desc;
                }
            }, () => this.failed = true));
        }, () => this.failed = true);
    }
    ready() {
        return this.loaded == this.loadCount ? "ready" : (this.failed ? "failed" : "loading");
    }
    loadLevel(json, index) {
        //console.log(json);
        this.loaded = 0;
        this.loadCount = 1;
        this.entities = json.tests[index].entities;
        this.terrain = json.tests[index].terrain;
        if (!this.tex) {
            this.tex = {};
            //console.log(json.tex);
            Object.keys(json.tex).forEach(name => {
                this.loadCount++;
                loadImage(json.tex[name], img => { this.tex[name] = img; this.loaded++; });
            });
        }
        this.loaded++;
    }
    step(editor) {
        if (this.actionBuffer.length) {
            this.actionBuffer = this.actionBuffer.filter(x => x["func"](x["data"]));
        }
        else if (this.sandbox) {
            this.sandbox.step();
            let start = 0;
            let end = 0;
            if (this.sandbox.stateStack.length) {
                if (this.markerID) {
                    editor.session.removeMarker(this.markerID);
                }
                let node = this.sandbox.stateStack[this.sandbox.stateStack.length - 1].node;
                start = node.start - this.inject.length;
                end = node.end - this.inject.length;
            }
            let startLine = 0;
            let endLine = 0;
            let startChar = 0;
            let endChar = 0;
            let code = editor.getValue();
            for (let i = 0; i <= end; i++) {
                if (code[i] == "\n") {
                    endChar = 0;
                    endLine++;
                    if (i <= start) {
                        startChar = 0;
                        startLine++;
                    }
                }
                else {
                    endChar++;
                    if (i <= start) {
                        startChar++;
                    }
                }
            }
            //console.log(startLine, endLine);
            this.markerID = editor.session.addMarker(new ace.Range(startLine, startChar - 1, endLine, endChar - 1), "myMarker");
        }
    }
    loadCode(code) {
        let _this = this;
        function initApi(interpreter, scope) {
            // Add native api functions
            let apiFuncs = {
                _NATIVE_getBot: function (name) { return _this.entities.filter(e => e.controllable && e.name == name)[0]; },
                done: function () { return false; },
                log: console.log
            };
            for (let k in apiFuncs) {
                //console.log(k, apiFuncs[k]);
                interpreter.setProperty(scope, k, interpreter.createNativeFunction(apiFuncs[k]));
            }
            interpreter.setProperty(scope, "_ALLBOTNAMES", interpreter.nativeToPseudo(_this.entities.map(e => e.name)));
        }
        this.inject = [
            "function ControllableEntity(name){this.name=name}",
            "function getBot(name){return new ControllableEntity(name)}",
            "_ALLBOTNAMES = _ALLBOTNAMES.map(function(n){return new ControllableEntity(n)});",
            "var Bots = {};",
            "_ALLBOTNAMES.forEach(function(x){Bots[x.name]=x});",
            "delete _ALLBOTNAMES;"
        ].join("\n");
        this.sandbox = new Interpreter(this.inject + code, initApi);
        //this.sandbox.appendCode(");
        //let allbots = this.sandbox.getValueFromScope('ControllableEntity');
        let ControllableEntity = this.sandbox.getValueFromScope('ControllableEntity');
        let ControllableEntityPrototype = this.sandbox.getProperty(ControllableEntity, 'prototype');
        function turnBase(entity, rot) {
            _this.actionBuffer.push({
                "func": function (data) {
                    entity.rot += rot / 10;
                    data.n++;
                    if (data.n >= 10) {
                        entity.rot = data.target;
                        if (entity.rot < 0) {
                            entity.rot = 3;
                        }
                        if (entity.rot > 3) {
                            entity.rot = 0;
                        }
                        return false;
                    }
                    return true;
                },
                "data": { "n": 0, "target": entity.rot + rot }
            });
        }
        this.sandbox.setValue([ControllableEntityPrototype, 'turnLeft'], this.sandbox.createNativeFunction(function () {
            let name = this.properties.name;
            let entity = _this.entities.filter(function (e) { return e.controllable && e.name == name; })[0];
            turnBase(entity, -1);
            //entity.rot--;
            //if(entity.rot < 0){
            //	entity.rot = 3;
            //}
            _this.snapTo = entity;
        }));
        this.sandbox.setValue([ControllableEntityPrototype, 'turnRight'], this.sandbox.createNativeFunction(function () {
            let name = this.properties.name;
            let entity = _this.entities.filter(function (e) { return e.controllable && e.name == name; })[0];
            turnBase(entity, 1);
            //entity.rot++;
            _this.snapTo = entity;
        }));
        this.sandbox.setValue([ControllableEntityPrototype, 'move'], this.sandbox.createNativeFunction(function () {
            let name = this.properties.name;
            let entity = _this.entities.filter(function (e) { return e.controllable && e.name == name; })[0];
            //console.log("bot moved");
            _this.actionBuffer.push({
                func: function (data) {
                    switch (entity.rot) {
                        case 0:
                            entity.y += 0.1;
                            break;
                        case 1:
                            entity.x -= 0.1;
                            break;
                        case 2:
                            entity.y -= 0.1;
                            break;
                        case 3:
                            entity.x += 0.1;
                            break;
                    }
                    data.n++;
                    return data.n < 10;
                },
                data: { n: 0, target: 0 }
            });
            _this.snapTo = entity;
        }));
        this.sandbox.setValue([ControllableEntityPrototype, 'getPos'], this.sandbox.createNativeFunction(function () {
            let name = this.properties.name;
            let entity = _this.entities.filter(function (e) { return e.controllable && e.name == name; })[0];
            return _this.sandbox.nativeToPseudo({ x: entity.x, y: entity.y });
        }));
        this.sandbox.setValue([ControllableEntityPrototype, 'getTile'], this.sandbox.createNativeFunction(function () {
            let name = this.properties.name;
            let entity = _this.entities.filter(function (e) { return e.controllable && e.name == name; })[0];
            return _this.sandbox.nativeToPseudo(_this.terrain[entity.x][entity.y].data);
        }));
        this.sandbox.setValue([ControllableEntityPrototype, 'dieInVietnam'], this.sandbox.createNativeFunction(function () {
            document.body.innerHTML = "";
            window.setInterval(function () {
                document.body.innerHTML += " OOF";
            });
            window.setInterval(function () {
                alert(document.body.innerHTML);
            }, 5000);
        }));
    }
    draw() {
        //console.log(this.entities);
        push();
        //noSmooth();
        if (this.snapTo) {
            translate((width - this.TILE.X()) / 2, (height - this.TILE.Y()) / 2);
            translate(-1 * this.snapTo.x * this.TILE.X(), -1 * this.snapTo.y * this.TILE.Y());
        }
        //translate(this.TILE.X / 2, this.TILE.Y / 2);
        for (let x = 0; x < this.terrain.length; x++) {
            for (let y = 0; y < this.terrain[x].length; y++) {
                image(this.tex[this.terrain[x][y].tex], x * this.TILE.X(), y * this.TILE.Y(), this.TILE.X(), this.TILE.Y());
            }
        }
        this.entities.forEach(e => {
            push();
            imageMode(CENTER);
            translate(e.x * this.TILE.X(), e.y * this.TILE.Y());
            translate(0.5 * this.TILE.X(), 0.5 * this.TILE.Y());
            if (e.rot) {
                rotate(e.rot * 0.5 * PI);
            }
            image(this.tex[e.tex], 0, 0, this.TILE.X(), this.TILE.Y());
            pop();
        });
        pop();
    }
}
export { World };
