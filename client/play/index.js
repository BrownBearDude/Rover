var world;
var infoDiv;
function setup(){
	createCanvas(...resizeToFit(document.getElementById('game-div'))).parent('game-div');
	var ID = (new URL(document.URL)).searchParams.get("map");
	world = new World(ID);
}

function draw(){
	if(world.ready() == "loading"){
		return;
	}
	if(world.ready() == "failed"){
		alert("Oops! Looks like this world id is invalid.");
		window.open("/", "_self");
	}
	if(!infoDiv && world.desc){
		infoDiv = document.querySelector("#info-div #content");
		infoDiv.innerHTML = marked(world.desc[0]);
	}
	background(0);
	if(world.sandbox){
		world.step(editor);
	}
	world.draw();
}

function windowResized(){
	resizeCanvas(...resizeToFit(document.getElementById('game-div')));
}

function resizeToFit(div){
	var n = Math.min(div.offsetWidth, div.offsetHeight);
	return [n,n];
}

/*
//Code here excecutes once
var fib = [];
while(!done()){
    fib.push(!fib[2]?fib.length:fib[fib.length-1]+fib[fib.length-2]);
    log(fib[fib.length-1]);
}
*/