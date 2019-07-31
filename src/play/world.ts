/// <reference types="./definitions/p5-global" />
/// <reference types="./definitions/interpreter"/>
import { Image } from "p5";
import * as monaco from "../../node_modules/monaco-editor/esm/vs/editor/editor.main";
import { Tester, testResult } from "./tester";
import * as Babel from "@babel/standalone";
import * as sourceMap from "../../node_modules/source-map/source-map";
import p5 from "p5";

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
    inject: string;
    snapTo: any;
    tester: Tester;
    testResults: testResult[];
    sourceMapConsumer: sourceMap.SourceMapConsumer;
    babelFR: any;
    subdisplay: CanvasRenderingContext2D;
    subdisplay_data: Object
    crashMSG: string;
    constructor(worldID: string) {
        this.editorDeco = [];
        this.loaded = 0;
        this.loadCount = 1;
        this.actionBuffer = [];
        this.failed = false;
        this.crashMSG = null;
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
        this.subdisplay = (document.getElementById("infoPanelCanvas") as HTMLCanvasElement).getContext("2d");
    }
	
	ready(){
		return this.loaded == this.loadCount? "ready" : (this.failed ? "failed" : "loading");
	}

    loadLevel(json: string, index: number) {
        let j = JSON.parse(json);
		this.entities = j.tests[index].entities;
        this.terrain = j.tests[index].terrain;
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
		if(this.actionBuffer.length){
			this.actionBuffer = this.actionBuffer.filter(f=>f["func"](f["data"]));
        } else if (this.sandbox) {
            let deco_options = { inlineClassName: "codeActivity" };
            this.testResults = this.tester.test();
            try {
                this.sandbox.step();
            } catch (e) {
                this.crashMSG = e;
                deco_options.inlineClassName = "codeError";
            }
			let start = 0;
			let end = 0;
			if (this.sandbox.stateStack.length) {
				let node = this.sandbox.stateStack[this.sandbox.stateStack.length - 1].node;
				start = node.start - this.inject.length;
				end = node.end - this.inject.length;
			}
			let startLine = 0;
			let endLine = 0;
			let startChar = 0;
            let endChar = 0;
            let code: string = (window as any).buggyBabel ? this.babelFR.code : editor.getValue();
			for(let i = 0;i <= end;i++){
				if(code[i] == "\n"){
					endChar = 0;
					endLine++;
					if(i <= start){
						startChar = 0;
						startLine++;
					}
				} else {
					endChar++;
					if(i <= start){
						startChar++;
					}
				}
            }
            console.log("start", startLine, startChar);
            console.log("end", endLine, endChar);
            console.log("orig", code.slice(start, end));
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
                this.editorDeco = editor.deltaDecorations(this.editorDeco, [{ range: new monaco.Range(startLine + 1, startChar, endLine + 1, endChar), options: deco_options }]);
            }
		}
	}

    async loadCode(code: string) {
        //throw Error("TEST");
        //window.babel = Babel;
        const babelFileResult: any = Babel.transform(code, { presets: ['es2015'], "sourceMaps": true }); //TODO: Add types for babel
        //const babelFileResult: any = {};
        if ((window as any).buggyBabel) {
            code = babelFileResult.code;
        }
        this.sourceMapConsumer = await new sourceMap.SourceMapConsumer(babelFileResult.map);
        this.babelFR = babelFileResult;
        console.log("Converted babel code:\n" + code);
		let _this: this = this;
		function initApi(interpreter, scope) {
			// Add native api functions
			let apiFuncs = { //These functions are native
                _NATIVE_getBot: function (name) { return _this.entities.filter(e => e.inherits["ControllableEntity"] && e.name == name)[0]},
				done: function(){return false},
				log: console.log
			};
			for(let k in apiFuncs){
				//console.log(k, apiFuncs[k]);
                interpreter.setProperty(scope, k, interpreter.createNativeFunction(apiFuncs[k]));
            }
            interpreter.setProperty(scope, "_ALLBOTNAMES", interpreter.nativeToPseudo(_this.entities.map(e=>e.name)));
		}
		this.inject = [ //These functions are injected into the sandbox
            "function ControllableEntity(name){this.name=name}",
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
		
		let turnBase = function(entity, rot){
			_this.actionBuffer.push({
				"func" : function(data){
					entity.rot += rot/10;
					data.n++;
					if(data.n >= 10){
						entity.rot = data.target;
						if(entity.rot < 0){
							entity.rot = 3;
						}
						if(entity.rot > 3){
							entity.rot = 0;
						}
						return false;
					}
					return true;
				},
				"data": {"n":0,"target":entity.rot+rot}
			});
		};
		
		this.sandbox.setValue([ControllableEntityPrototype, 'turnLeft'], this.sandbox.createNativeFunction(function(){
			let name = this.properties.name;
			let entity = _this.entities.filter(function(e){return e.inherits["ControllableEntity"]&&e.name==name})[0];
			turnBase(entity, -1);
			//entity.rot--;
			//if(entity.rot < 0){
			//	entity.rot = 3;
			//}
			_this.snapTo = entity;
		}));
		
		this.sandbox.setValue([ControllableEntityPrototype, 'turnRight'], this.sandbox.createNativeFunction(function(){
			let name = this.properties.name;
            let entity = _this.entities.filter(function (e) { return e.inherits["ControllableEntity"]&&e.name==name})[0];
			turnBase(entity, 1);
			//entity.rot++;
			_this.snapTo = entity;
		}));
		
		this.sandbox.setValue([ControllableEntityPrototype, 'move'], this.sandbox.createNativeFunction(function(){
			let name = this.properties.name;
            let entity = _this.entities.filter(function (e) { return e.inherits["ControllableEntity"]&&e.name==name})[0];
			//console.log("bot moved");
			_this.actionBuffer.push({
				func : function(data){
					switch(entity.rot){
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
                    if (data.n < 10) {
                        return true;
                    }
                    entity.x = Math.round(entity.x);
                    entity.y = Math.round(entity.y);
					return false;
				},
				data: {n:0, target:0}
			});
			_this.snapTo = entity;
		}));
		

		this.sandbox.setValue([ControllableEntityPrototype, 'getPos'], this.sandbox.createNativeFunction(function(){
			let name = this.properties.name;
            let entity = _this.entities.filter(function (e) { return e.inherits["ControllableEntity"]&&e.name==name})[0];
			return _this.sandbox.nativeToPseudo({x: entity.x, y: entity.y});
		}));
		
		this.sandbox.setValue([ControllableEntityPrototype, 'getTile'], this.sandbox.createNativeFunction(function(){
			let name = this.properties.name;
            let entity = _this.entities.filter(function (e) { return e.inherits["ControllableEntity"]&&e.name==name})[0];
			return _this.sandbox.nativeToPseudo(_this.terrain[entity.x][entity.y].data);
		}));
		
		this.sandbox.setValue([ControllableEntityPrototype, 'dieInVietnam'], this.sandbox.createNativeFunction(function(){
			document.body.innerHTML = "";
			window.setInterval(function(){
				document.body.innerHTML += " OOF";
			});
			window.setInterval(function(){
				alert(document.body.innerHTML);
			}, 5000);
		}));
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

        if (!(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height)) mouseTile = null;

		for(let x = 0;x < this.terrain.length;x++){
			for(let y = 0;y < this.terrain[x].length;y++){
                image(this.tex[this.terrain[x][y].tex], x * TILE_X, y * TILE_Y, TILE_X, TILE_Y);
			}
        }

        if (!mouseIsPressed && mouseTile) {
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

        if (mouseIsPressed && mouseTile) {
            fill(0, 100, 0, 100);
            rect(mouseTile.x * TILE_X, mouseTile.y * TILE_Y, TILE_X, TILE_Y);
        } 
        
        pop();
        this.subdisplay_data = drawSubdisplay(this.subdisplay, this.subdisplay_data, mouseTile, this);
	}
}
export { World };

function drawSubdisplay(ctx: CanvasRenderingContext2D, data: Object, mouseTile: { x: number, y: number }, world: World) {
    if (data === undefined) data = { flickerClock: 0, barY: 0 };

    //Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);


    if (mouseTile) {
        let imgCTX: HTMLCanvasElement;
        if (mouseIsPressed) {
            const entity = world.entities.filter(e => e.x == mouseTile.x && e.y == mouseTile.y)[0];
            if (entity) {
                imgCTX = (world.tex[entity.tex] as any).canvas;
            }
        } else {
            try {
                imgCTX = (world.tex[world.terrain[mouseTile.x][mouseTile.y].tex] as any).canvas;
            } catch (e) {

            }
        }
        if (imgCTX) {
            ctx.drawImage(imgCTX, 0, (ctx.canvas.height - ctx.canvas.width / 3) / 2, ctx.canvas.width / 3, ctx.canvas.width / 3);
        }
    } else {
        ctx.font = "10px Courier New";
        ctx.textBaseline = "hanging"; 
        world.tester.results.forEach((t, i) => {
            ctx.fillStyle = t.passed ? "#00FF00" : "#FFFFFF";
            ctx.fillText(t.task, 0, i * 10);
        });
    }

    //Draw overlay
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    data['flickerClock']++;
    ctx.fillStyle = "rgba(255, 255, 255, " + (Math.random() / 100 / data['flickerClock']) + ")";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (data['flickerClock'] == 20) data['flickerClock'] = 0;

    const bars = 50;
    const barHeight = ctx.canvas.height / bars / 2;
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    for (let y = 0; y < bars; y++) {
        ctx.fillRect(0, y * 2 * barHeight, ctx.canvas.width, barHeight);
    }

    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";

    ctx.fillRect(0, data['barY'], ctx.canvas.width, ctx.canvas.height / 10);
    data['barY']++;
    if (data['barY'] > ctx.canvas.height * 2) {
        data['barY'] = ctx.canvas.height / -10;
    }
    return data;
}