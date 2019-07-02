import { World } from "./world";

let world: World;
let canvasDiv : Element;
let infoDiv : Element;
let editor : AceAjax.Editor;

function setup() {
    canvasDiv = document.getElementById('canvasContainer')
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/twilight");
    editor.session.setMode("ace/mode/javascript");
    let size : number[] = resizeToFit(canvasDiv);
	createCanvas(size[0], size[1]).parent('canvasContainer');
    let ID : string = (new URL(document.URL)).searchParams.get("map");
	world = new World(ID);
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
		infoDiv.innerHTML = marked(world.desc[0]);
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
window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
/*
//Code here excecutes once
var fib = [];
while(!done()){
    fib.push(!fib[2]?fib.length:fib[fib.length-1]+fib[fib.length-2]);
    log(fib[fib.length-1]);
}
*/