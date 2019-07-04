/// <reference types="./definitions/p5-global" />
/// <reference types="./definitions/marked-global" />
/// <reference types="../lib/monaco-editor/monaco" />
import * as monaco from "../lib/monaco-editor/esm/vs/editor/editor.main";
import { World } from "./world";
import * as acorn from "../lib/acorn";

//import { AceAjax } from "ace";
//(window as any).Ace = Ace;
(window as any).acorn = acorn; // Import and expose acorn to the global scope

let world: World;
let canvasDiv : Element;
let infoDiv: Element;
let editor: monaco.editor.IStandaloneCodeEditor;

function setup() {
    canvasDiv = document.getElementById('canvasContainer')

    editor = monaco.editor.create(document.getElementById('editor'), {
        value: [
            "//Code here excecutes once",
            "while(true){",
            "   //Code in here loops forever",
            "}",
        ].join('\n'),
        language: 'javascript',
        theme: 'vs-dark'
    });

    //editor = ace.edit("editor");
    //editor.setTheme("ace/theme/twilight");
    //editor.session.setMode("ace/mode/javascript");
    let size : number[] = resizeToFit(canvasDiv);
	createCanvas(size[0], size[1]).parent('canvasContainer');
    let ID : string = (new URL(document.URL)).searchParams.get("map");
    world = new World(ID);
    (window as any).world = world;
    (window as any).editor = editor;
}

function draw(){
	if(world.ready() == "loading"){
		return;
	}
	if(world.ready() == "failed"){
		alert("Oops! Looks like this world id is invalid.");
		//window.open("/", "_self");
	}
	if(!infoDiv && world.desc){
        infoDiv = document.querySelector("#content");
        infoDiv.innerHTML = window.marked(world.desc[0]);
	}
	background(0);
	if(world.sandbox){
		world.step(editor);
	}
	world.draw();
}

function windowResized() {
    let size : number[] = resizeToFit(canvasDiv);
    resizeCanvas(size[0], size[1]);
}

function resizeToFit(div){
    let n : number = Math.min(div.offsetWidth, div.offsetHeight);
	return [n,n];
}
(window as any).setup = setup;
(window as any).draw = draw;
(window as any).windowResized = windowResized;
/*
//Code here excecutes once
var fib = [];
while(!done()){
    fib.push(!fib[2]?fib.length:fib[fib.length-1]+fib[fib.length-2]);
    log(fib[fib.length-1]);
}
*/