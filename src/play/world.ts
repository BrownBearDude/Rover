/// <reference types="./definitions/p5-global" />
/// <reference types="./definitions/interpreter"/>
import { Image } from "p5";
import * as monaco from "../../node_modules/monaco-editor/esm/vs/editor/editor.main";
import { Tester, testResult } from "./tester";
import * as Babel from "@babel/standalone";
import * as sourceMap from "../../node_modules/source-map/source-map";

class World{
    //Todos: Define interfaces for entites, terrain, etc
    loaded: number;
    loadCount: number;
    TILE: { X: () => number; Y: () => number; };
    entities: any[];
    terrain: any[][];
    tex: { [key: string]: Image };
    json: any;
    sandbox: Interpreter; //Wut
    actionBuffer: Object[];
    failed: boolean;
    editorDeco: string[];
    desc: string[];
    tester: Tester;
    testResults: testResult[];
    sourceMapConsumer: sourceMap.SourceMapConsumer;
    babelFR: any;
    subdisplay: SubDisplay;
    stackTrace: string;
    prevRange: monaco.Range;
    callbacks: { [key: string]: (world: World) => void };
    sent_data: any
    snapTo: any;
    prevMouseIsPressed: boolean;
    constructor(worldID: string) {
        this.editorDeco = [];
        this.loaded = 0;
        this.loadCount = 1;
        this.actionBuffer = [];
        this.failed = false;
        this.stackTrace = null;
		this.TILE = {
			X: ()=>width/10,
			Y: ()=>height/10
        };
        this.loadCount++;
        loadStrings("/levels/" + worldID + "/data.json", json => { this.loaded++; this.json = json.join("\n"); this.loadLevel(this.json, 0) }, () => this.failed = true);
        this.loadCount++;
        loadStrings("/levels/" + worldID + "/t_index.txt", index => {
            this.loaded++;
            let desc = [];
            index.forEach(path => {
                this.loadCount++;
                loadStrings("/levels/" + worldID + "/task/" + path, md => {
                    this.loaded++;
                    desc.push(md.join("\n"));
                    if (desc.length >= index.length) {
                        this.desc = desc;
                    }
                }, () => this.failed = true);
            });
        }, () => this.failed = true);
        this.loadCount++;
        loadStrings("/levels/" + worldID + "/tests.js", test => { this.tester = new Tester(this, test.join("\n"));this.loaded++; }, () => this.failed = true);
        this.loaded++;
        this.subdisplay = new SubDisplay();
    }
	
	ready(){
		return this.loaded == this.loadCount? "ready" : (this.failed ? "failed" : "loading");
	}

    loadLevel(json: string, index: number) {
        let j = JSON.parse(json);
		this.entities = j.tests[index].entities;
        this.terrain = j.tests[index].terrain;
        this.snapTo = j.tests[index].snapTo; //If it's undefined, then in resets it. Otherwise, it snaps. We all good!
        if (this.tester) {
            this.tester.reset(this);
        }
        if (!this.tex) {
            //Means that this is the first time loading
			this.tex = {};
			//console.log(json.tex);
            for (let name in j.tex) {
                if (j.tex.hasOwnProperty(name)) {
                    this.loadCount++;
                    loadImage(j.tex[name], img => { this.tex[name] = img; this.loaded++ });
                }
            }
            window.document.title += " - " + j.meta.title;
        }
	}

    step(editor: monaco.editor.IStandaloneCodeEditor) {
        let _code = editor.getValue();
		if(this.actionBuffer.length){
			this.actionBuffer = this.actionBuffer.filter(f => f["func"](f["data"]));
        } else if (this.sandbox) {
            const deco_options = { inlineClassName: "codeActivity" };
            this.testResults = this.tester.test(this.sent_data);
            //console.log(this.editorDeco);
            let stack = this.sandbox.stateStack
                .map(n => n.node)
                .filter(n => n.start >= 0 && n.end >= 0);
            try {
                this.sandbox.step();
                //console.log("Stepped.");
            } catch (e) {
                this.stackTrace = rewind(e, stack, _code, 0);
                this.editorDeco = editor.deltaDecorations(this.editorDeco, [{
                    range: this.prevRange,
                    options: {
                        inlineClassName: "codeError",
                        hoverMessage: [{
                            value: 'Uncaught ' + (e.name ? (e.name + ": " + e.message) : e)
                        }]
                    }
                }]);
                return;
            }
            let start = 0;
            let end = 0;
            let code: string = (window as any).buggyBabel ? this.babelFR.code : _code;
            if (this.sandbox.stateStack.length) {
                
                let node = this.sandbox.stateStack[this.sandbox.stateStack.length - 1].node;
                for (let i = 2; node.__IS_POLYFILL__; i++) {
                    if (!this.sandbox.stateStack[this.sandbox.stateStack.length - i]) {
                        node = this.sandbox.stateStack[this.sandbox.stateStack.length - i + 1].node;
                        break;
                    }
                    node = this.sandbox.stateStack[this.sandbox.stateStack.length - i].node;
                }
                start = node.start;// - this.inject.length;
                end = node.end;// - this.inject.length;
            }
            if ((window as any).buggyBabel) {
                //start += this.inject.length;
                //end += this.inject.length;
            }
            let _res = toRowsAndColumns(code, start, end);
            let startLine = _res.startLine;
            let startChar = _res.startChar;
            let endLine = _res.endLine;
            let endChar = _res.endChar;
            /*
            console.log("start", startLine, startChar);
            console.log("end", endLine, endChar);
            console.log("orig", code.slice(start, end));
            */
            /*
            let lg = (code) => {
                let x = code.split("\n").slice(startLine, endLine);
                let l = x[x.length - 1].length;
                let y = x.join("\n");
                return y.slice(startChar, y.length - l + endChar);
            };
            try {
                console.log("mod", lg(code));
            } catch (e) { }//console.error(e) }*/
            //let debug = (window as any).debug;
            this.prevRange = new monaco.Range(startLine + 1, startChar, endLine + 1, endChar);
            if ((window as any).buggyBabel) {
                let converted = this.sourceMapConsumer.originalPositionFor({ line: startLine + 1, column: startChar });
                startLine = converted.line;
                startChar = converted.column;
                converted = this.sourceMapConsumer.originalPositionFor({ line: endLine + 1, column: endChar });
                endLine = converted.line;
                endChar = converted.column;
                console.log("genStart", startLine, startChar);
                console.log("genEnd", endLine, endChar);
                editor.setValue(this.babelFR.code);
                this.editorDeco = editor.deltaDecorations(this.editorDeco, [{ range: new monaco.Range(startLine + 2, startChar + 1, endLine + 1, endChar + 3), options: deco_options }]);
            } else {
                this.editorDeco = editor.deltaDecorations(this.editorDeco, [{ range: this.prevRange, options: deco_options }]);
            }
        }
        if (this.testResults.filter(tr => !tr.passed).length == 0 && this.callbacks["testComplete"]) {
            this.callbacks["testComplete"](this);
        }
	}

    async loadCode(code: string) {
        //throw Error("TEST");
        //window.babel = Babel;
        let babelFileResult: any;
        //const babelFileResult: any = {};
        if ((window as any).buggyBabel) {
            babelFileResult = Babel.transform(code, { presets: ['es2015'], "sourceMaps": true }); //TODO: Add types for babel
            this.sourceMapConsumer = await new sourceMap.SourceMapConsumer(babelFileResult.map);
            code = babelFileResult.code;
        }
        this.babelFR = babelFileResult;
        //console.log("Converted babel code:\n" + code);
        let _this: this = this;

        let turnBase = function (entity, rot) {
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
        };
        const _sandboxed_functionCalls = {
            Rover: {
                turn_left: function (entity) {
                    turnBase(entity, -1);
                    //_this.snapTo = entity;
                },
                turn_right: function (entity) {
                    turnBase(entity, 1);
                    //_this.snapTo = entity;
                },
                move: function (entity) {
                    _this.actionBuffer.push({
                        func: function (data) {
                            const dir = [
                                { x: 0, y: 1 },
                                { x: -1, y: 0 },
                                { x: 0, y: -1 },
                                { x: 1, y: 0 },
                            ];
                            function traversable(x: number, y: number): boolean {
                                let row = _this.terrain[x];
                                if (!row) {
                                    return false;
                                }
                                let tile = row[y];
                                if (!tile) {
                                    return false;
                                }
                                if (tile.traversable !== undefined && !tile.traversable) {
                                    return false;
                                }
                                return !_this.entities.filter(e => e.x == x && e.y == y && e != entity && e.inherits["Physical"] && e.inherits["Physical"].weight <= 5).length;
                            }
                            if (data.n == 0 && !traversable(entity.x + dir[entity.rot].x, entity.y + dir[entity.rot].y)) return false;
                            entity.x += dir[entity.rot].x / 10;
                            entity.y += dir[entity.rot].y / 10;
                            if (++data.n < 10) {
                                return true;
                            }
                            entity.x = Math.round(entity.x);
                            entity.y = Math.round(entity.y);
                            return false;
                        },
                        data: { n: 0 }
                    });
                    //_this.snapTo = entity;
                },
                sensor_read_forward_tile: function (entity) {
                    alert("dvdv");
                    const dir = [
                        { x: 0, y: 1 },
                        { x: -1, y: 0 },
                        { x: 0, y: -1 },
                        { x: 1, y: 0 },
                    ];
                    //alert("yee");
                    console.log(entity);
                    let column = _this.terrain[entity.x + dir[entity.rot].x]
                    if (!column) return _this.sandbox.nativeToPseudo({});
                    let tile = column[entity.y + dir[entity.rot].y];
                    if (!tile) return _this.sandbox.nativeToPseudo({});
                    console.log(tile);
                    return _this.sandbox.nativeToPseudo(tile.visible_properties || {});
                }
            },
            IO_ports: {
                forward_entity_name: function (entity) {
                    //alert("sdsd");
                    const dir = [
                        { x: 0, y: 1 },
                        { x: -1, y: 0 },
                        { x: 0, y: -1 },
                        { x: 1, y: 0 },
                    ];
                    let ent = _this.entities.filter(e => e.x == entity.x + dir[entity.rot].x && e.y == entity.y + dir[entity.rot].y)[0];
                    //alert(ent ? ent.name : "");
                    if (ent) return ent.name;
                }
            },
            Data_storage: {
                store: function (entity, args) {
                    let data = args[0];
                    entity.inherits.Data_storage.data = data;
                }
            }
        }
        function initApi(interpreter: Interpreter, scope) {
            function _request_action(entityName: string, className: string, funcName: string, args: IArguments) {
                return _sandboxed_functionCalls[className][funcName](_this.entities.filter(entity => entity.name == entityName)[0], args);
            }
            interpreter.setProperty(scope, "log", interpreter.createNativeFunction(function () { window.console.log(...arguments) }));
            interpreter.setProperty(scope, "_request_action", interpreter.createNativeFunction(_request_action));
            interpreter.setProperty(scope, "_ALL_RAW_ENTITIES", interpreter.nativeToPseudo(_this.entities));
            interpreter.setProperty(scope, "send_data", interpreter.createNativeFunction(function (data) { _this.sent_data = data }));
		}
        const polyfill = [ //These functions are injected into the sandbox
            "var Bots = {};",
            "(function(){",
            "   var request_action = _request_action", //Store native function in private var
            "   var creators = {",
            "       Accessible: function(ENTITY, RAW_ENTITY){",
            "           Bots[RAW_ENTITY.name] = ENTITY;",
            "           return ENTITY;",
            "       },",
            "       Rover: function(ENTITY, RAW_ENTITY){",
            "           ENTITY.turn_left = function(){return request_action(RAW_ENTITY.name, 'Rover', 'turn_left', arguments)};",
            "           ENTITY.turn_right = function(){return request_action(RAW_ENTITY.name, 'Rover', 'turn_right', arguments)};",
            "           ENTITY.move = function(){return request_action(RAW_ENTITY.name, 'Rover', 'move', arguments)};",
            "           ENTITY.sensor = {",
            "               read_front_tile: function(){",
            "                   return request_action(RAW_ENTITY.name, 'Rover', 'sensor_read_forward_tile', arguments);",
            "               } ",
            "           };",
            "           return ENTITY; ",
            "       },",
            "       Physical: function(ENTITY){return ENTITY},", //Dud function
            "   }",
            "   var _ALL_LINKED_ENTITIES = _ALL_RAW_ENTITIES.map(function(RAW_ENTITY){",
            "       var ENTITY = {_name: RAW_ENTITY.name};",
            "       log('TEST');",
            "       for(var inherit in RAW_ENTITY.inherits){",
            "           log(ENTITY);",
            "           ENTITY = creators[inherit](ENTITY, RAW_ENTITY);",
            "       }",
            "       return ENTITY;",
            "   });",
            "})();",
            "_ALL_RAW_ENTITIES = undefined;", //Remove data about raw entities
            "_request_action = undefined;" //Remove native function
        ].join("\n");//"(function(){\n\t" +  + "\n})();"
        let polyfill_ast = (window as any).acorn.parse(polyfill, (Interpreter as any).PARSE_OPTIONS);
        console.log("AST: ", polyfill_ast);
        let mark_stack: Object[] = [polyfill_ast];
        while (mark_stack.length) { //Dirty mark nodes
            let mark_obj = mark_stack.pop();
            if (mark_obj && typeof mark_obj == "object" && !mark_obj["__IS_POLYFILL__"]) {
                mark_obj["__IS_POLYFILL__"] = true;
                Object.keys(mark_obj).forEach(k => mark_stack.push(mark_obj[k]));
            }
        }
        this.sandbox = new Interpreter(polyfill_ast, initApi);
        this.sandbox.run();
        this.sandbox.appendCode(code);
	}
	
    draw() {
        let offset: { x: number, y: number } = { x: 0, y: 0 };
        const TILE_X = this.TILE.X();
        const TILE_Y = this.TILE.Y();
        function translate(x, y) {
            offset.x += x;
            offset.y += y;
            return (window as any).translate(x,y);
        }
		//console.log(this.entities);
		push();
		//noSmooth();
		if(this.snapTo){
            translate((width - TILE_X) / 2, (height - TILE_X) / 2);
			translate(-1 * this.snapTo.x * TILE_X, -1 * this.snapTo.y * TILE_Y);
		}

        let mouseTile: { x: number, y: number } = {
            x: floor((mouseX - offset.x) / TILE_X),
            y: floor((mouseY - offset.y) / TILE_Y)
        };

        if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
            if (mouseIsPressed && !this.prevMouseIsPressed && mouseButton === RIGHT && this.terrain[mouseTile.x] && this.terrain[mouseTile.x][mouseTile.y]) {
                this.snapTo = mouseTile;
            }
        } else {
            mouseTile = null;
        }
		for(let x = 0;x < this.terrain.length;x++){
            for (let y = 0; y < this.terrain[x].length; y++){
                if (this.terrain[x][y].tex_before) {
                    this.terrain[x][y].tex_before.forEach(tex => image(this.tex[tex], x * TILE_X, y * TILE_Y, TILE_X, TILE_Y));
                }
                image(this.tex[this.terrain[x][y].tex], x * TILE_X, y * TILE_Y, TILE_X, TILE_Y);
			}
        }

        if (!(mouseIsPressed && mouseButton === LEFT) && mouseTile) {
            fill(0, 0, 100, 100);
            rect(mouseTile.x * TILE_X, mouseTile.y * TILE_Y, TILE_X, TILE_Y);
        } 

		this.entities.forEach(e=>{
			push();
			imageMode(CENTER);
			translate(e.x * TILE_X, e.y * TILE_Y);
			translate(0.5 * TILE_X, 0.5 * TILE_Y);
			if(e.rot){
				rotate(e.rot * 0.5 * PI);
			}
			image(this.tex[e.tex], 0, 0, TILE_X, TILE_Y);
			pop();
        });

        if (mouseIsPressed && mouseButton === LEFT && mouseTile) {
            fill(0, 100, 0, 100);
            rect(mouseTile.x * TILE_X, mouseTile.y * TILE_Y, TILE_X, TILE_Y);
        } 
        
        pop();
        this.subdisplay.update(mouseTile, this);
        this.prevMouseIsPressed = mouseIsPressed;
    }
    on(name: string, callback: (world: World) => void) {
        this.callbacks[name] = callback;
    }
    resetCallbacks() {
        this.callbacks = {};
    }
}
export { World };

class SubDisplay {
    tile_data: HTMLElement;
    info_panel_list: HTMLElement;
    ctx: CanvasRenderingContext2D;
    constructor() {
        this.ctx = (document.getElementById("infoPanelCanvas") as HTMLCanvasElement).getContext("2d");
        this.ctx.canvas.style.left = "25%";
        this.ctx.canvas.style.top = "50%";
        this.ctx.canvas.style.transform = "translate(-50%, -50%)";
        const update_canvas_size = () => {
            this.ctx.canvas.style.width = Math.min(this.ctx.canvas.parentElement.clientWidth / 2, this.ctx.canvas.parentElement.clientHeight) + "px";
            this.ctx.canvas.style.height = this.ctx.canvas.style.width;
        };
        window.addEventListener("resize", update_canvas_size);
        update_canvas_size();
    }
    update(mouseTile: { x: number, y: number }, world: World) {
        if (!this.info_panel_list) {
            this.info_panel_list = document.getElementById("infoPanelTaskList");
            this.tile_data = document.getElementById("infoPanelTileData");
            for (let i = 0; i < world.tester.results.length; i++) {
                this.info_panel_list.append(document.createElement("li"));
            }
        }
        if (mouseTile) {
            let img: HTMLCanvasElement;
            if (mouseIsPressed && mouseButton === LEFT) {
                const entity = world.entities.filter(e => e.x == mouseTile.x && e.y == mouseTile.y)[0];
                if (entity) {
                    img = (world.tex[entity.tex] as any).canvas;
                }
            } else {
                try {
                    img = (world.tex[world.terrain[mouseTile.x][mouseTile.y].tex] as any).canvas;
                } catch (e) {
                    //TODO
                }
            }

            this.ctx.clearRect(0, 0, 32, 32);
            if (img) {
                this.ctx.drawImage(img, 0, 0);
            }
            this.info_panel_list.style.display = "none";
            this.tile_data.style.display = "initial";
        } else {
            world.tester.results.forEach((result, i) => {
                (this.info_panel_list.children[i] as HTMLElement).innerText = result.task;
                (this.info_panel_list.children[i] as HTMLElement).style.color = result.passed ? "lawngreen" : "white";
            });

            this.info_panel_list.style.display = "initial";
            this.tile_data.style.display = "none";
        }
    }
}

function rewind(error, stack: any[], code: string, offsetVal: number) {
    function getName(index, node: { start: number, end: number, type: string, expression?: { callee: { name: string }, type: string } }): string {
        if (node.type == "ExpressionStatement") {
            if (node.expression.type == "CallExpression") {
                return (node.expression.callee.name || "<anonymous>");
            }
        }
        return index > 0 ? null : "<anonymous>";
    }
    return ["Uncaught " + error.name + ": " + error.message, ...stack.reverse().map((node, index) => {
        let res = toRowsAndColumns(code, node.start - offsetVal, node.end - offsetVal);
        let name = getName(index, node);
        return name ? name + " (line " + (res.startLine + 1) + " char " + res.startChar + ")" : "";
    }).filter(s => s.length)].join("\n\tat ");
}
//Converts a range of characters (0 - 10 say) into starting and ending rows and columns
function toRowsAndColumns(code: string, start = 0, end = 0) {
    let startLine = 0;
    let endLine = 0;
    let startChar = 0;
    let endChar = 0;
    for (let i = 0; i <= end; i++) {
        if (code[i] == "\n") {
            endChar = 0;
            endLine++;
            if (i <= start) {
                startChar = 0;
                startLine++;
            }
        } else {
            endChar++;
            if (i <= start) {
                startChar++;
            }
        }
    }
    return {startLine, endLine, startChar, endChar};
}