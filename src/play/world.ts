/// <reference types="./definitions/p5-global" />
/// <reference types="./definitions/interpreter"/>
import { Image } from "p5";
import * as monaco from "../../node_modules/monaco-editor/esm/vs/editor/editor.main";
import { Tester, testResult } from "./tester";
import * as Babel from "@babel/standalone";
import * as sourceMap from "../../node_modules/source-map/source-map";
import { string, object } from "prop-types";

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
    snapTo: any;
    tester: Tester;
    testResults: testResult[];
    sourceMapConsumer: sourceMap.SourceMapConsumer;
    babelFR: any;
    subdisplay: CanvasRenderingContext2D;
    subdisplay_data: Object
    stackTrace: string;
    prevRange: monaco.Range;
    callbacks: { [key: string]: (world: World) => void };
    stack_highlight_override: number;
    constructor(worldID: string) {
        this.stack_highlight_override = null;
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
        let _code = editor.getValue();
		if(this.actionBuffer.length){
			this.actionBuffer = this.actionBuffer.filter(f => f["func"](f["data"]));
        } else if (this.sandbox) {
            const deco_options = { inlineClassName: "codeActivity" };
            this.testResults = this.tester.test();
            //console.log(this.editorDeco);
            let stack = this.sandbox.stateStack
                .map(n => n.node)
                .filter(n => n.start >= 0 && n.end >= 0);
            this.stack_highlight_override = null;
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
            ControllableEntity: {
                turnLeft: function (entity) {
                    turnBase(entity, -1);
                    _this.snapTo = entity;
                },
                turnRight: function (entity) {
                    turnBase(entity, 1);
                    _this.snapTo = entity;
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
                                return true;
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
                    _this.snapTo = entity;
                }
            }
        }
        function initApi(interpreter: Interpreter, scope) {
            function _request_action(entityName: string, className: string, funcName: string, args: IArguments) {
                _this.stack_highlight_override = _this.sandbox.stateStack.length - 5;
                _sandboxed_functionCalls[className][funcName](_this.entities.filter(entity => entity.name == entityName)[0], args);
            }
            interpreter.setProperty(scope, "_request_action", interpreter.createNativeFunction(_request_action));
            interpreter.setProperty(scope, "_ALL_RAW_ENTITIES", interpreter.nativeToPseudo(_this.entities));
		}
        const polyfill = [ //These functions are injected into the sandbox
            "var Bots = {};",
            "var _ALL_LINKED_ENTITIES;",
            "(function(){",
            "   var request_action = _request_action", //Store native function in private var
            "   var creators = {",
            "       ControllableEntity: function(ENTITY, RAW_ENTITY){",
            "           Bots[RAW_ENTITY.name] = ENTITY;",
            "           ENTITY.turnLeft = function(){return request_action(RAW_ENTITY.name, 'ControllableEntity', 'turnLeft', arguments)};",
            "           ENTITY.turnRight = function(){return request_action(RAW_ENTITY.name, 'ControllableEntity', 'turnRight', arguments)};",
            "           ENTITY.move = function(){return request_action(RAW_ENTITY.name, 'ControllableEntity', 'move', arguments)};",
            "           return ENTITY;",
            "       }",
            "   }",
            "   _ALL_LINKED_ENTITIES = _ALL_RAW_ENTITIES.map(function(RAW_ENTITY){",
            "       var ENTITY = {};",
            "       for(var inherit in RAW_ENTITY.inherits){",
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
                /*
                if (mark_obj["body"]) {
                    mark_obj["body"].forEach(o => mark_stack.push(o));
                }
                if (mark_obj["declarations"]) {
                    mark_obj["declarations"].forEach(o => mark_stack.push(o));
                }
                if (mark_obj["expression"]) {
                    mark_stack.push(mark_obj["expression"]);
                }
                */
            }
        }
        
        /*
         * Frick, can't think of how to fix this.
         * Problem is that "visible" entities that live in the interpreter are linked with "true" entities that are real.
         * The problem arises when you want to access a normally "invisible" entity.
         * Right now, they are invisible because they simply haven't been generated yet.
         * That's not good.
         * 
         * Okay, I have a solution. ish.
         * 1. Pre-generate all entities
         * 2. Grab from entities
         */
        this.sandbox = new Interpreter(polyfill_ast, initApi);
        //let allbots = this.sandbox.getValueFromScope('ControllableEntity');
        /*
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
			_this.snapTo = entity;
		}));
		
		this.sandbox.setValue([ControllableEntityPrototype, 'turnRight'], this.sandbox.createNativeFunction(function(){
			let name = this.properties.name;
            let entity = _this.entities.filter(function (e) { return e.inherits["ControllableEntity"]&&e.name==name})[0];
			turnBase(entity, 1);
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
        */
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
    on(name: string, callback: (world: World) => void) {
        this.callbacks[name] = callback;
    }
    resetCallbacks() {
        this.callbacks = {};
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