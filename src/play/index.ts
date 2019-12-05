/// <reference types="./definitions/p5-global" />

import * as monaco from "monaco-editor/esm/vs/editor/editor.main";
import * as acorn from "../lib/acorn";
import { SubWindow } from "./subwindow";
import * as FileSystem from "./filesystem";
import { World } from "./world";
import { create_tutorial } from "./tutorial";
import * as _initJS from "./initJS";
import marked from "marked";
import 'simplebar';
import Prism from "prismjs";
import { EditorMode } from "./editormode";
_initJS.run();
//import * as highlight from "../../node_modules/highlightjs/highlight.pack";
marked.setOptions({
    highlight: (code, lang, _) => {
        const pre_element = document.createElement("pre");
        const code_element = document.createElement("code");
        pre_element.append(code_element);
        code_element.innerHTML = Prism.highlight(code, Prism.languages.javascript, 'javascript');
        pre_element.classList.add("rounded-codeblock");
        pre_element.setAttribute("data-simplebar", "data-simplebar");
        code_element.style.left = "5px";
        code_element.style.position = "relative";
        //pre_element.style.position = "absolute";
        //pre_element.parentElement.parentElement.style.left = "1px";
        //pre_element.parentElement.parentElement.style.position = "relative";
        return pre_element.outerHTML;
    }
});

(window as any).SubWindow = SubWindow;
(window as any).FileSystem = FileSystem;
//(window as any)['Interpreter'] = _initJS.Interpreter;
(window as any).acorn = acorn; // Import and expose acorn to the global scope

let world: World;
let canvasDiv: HTMLElement;
let infoDiv: HTMLElement;
let editor: monaco.editor.IStandaloneCodeEditor;

function setup() {
    noSmooth();

    monaco.languages.typescript.javascriptDefaults.addExtraLib([
        "declare Bots: { [key: string]: Bot };",
        "declare Bot: {};"
    ].join('\n'), 'filename/facts.d.ts');

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

    const canvas = createCanvas(32 * 10, 32 * 10).parent('canvasContainer').elt as HTMLCanvasElement;
    function resize_canvas() {
        canvas.style.width = Math.min(canvas.parentElement.offsetWidth, canvas.parentElement.offsetHeight) + "";
        canvas.style.height = canvas.style.width;
    }
    resize_canvas();
    window.addEventListener("resize", resize_canvas);

    const searchParams = (new URL(document.URL)).searchParams;
    const ID: string = searchParams.get("map");
    world = new World(ID);
    (window as any).world = world;
    (window as any).editor = editor;
    if ((new URL(document.URL)).searchParams.get("t")) {
        create_tutorial();
    }
    if (searchParams.get("editorMode")) {
        EditorMode.init_canvas(canvas);
        EditorMode.init_world(world);
    }
}
let stepWorld;
function changeSpeed(btn: HTMLInputElement) {
    stepWorld = function stepWorld() {
        for (let i = 0; i < btn.valueAsNumber; i++) {
            world.step(editor);
        }
    }
}
changeSpeed({ valueAsNumber: 1 } as HTMLInputElement);
(window as any).changeSpeed = changeSpeed;
(window as any).stepButtonPress = function stepButtonPress() {
    world.step(editor);
};
function draw() {
	if(world.ready() == "loading"){
		return;
	}
	if(world.ready() == "failed"){
		alert("Oops! Looks like this world id is invalid.");
		window.open("/", "_self");
    }
    if ((window as any).onWorldReady) {
        (window as any).onWorldReady();
        (window as any).onWorldReady = undefined;
    }
	if(!infoDiv && world.desc){
        infoDiv = document.querySelector("#content");
        infoDiv.innerHTML = marked(world.desc[0]);
        /*
        let elements = infoDiv.getElementsByClassName("rounded-codeblock");
        for (let i = 0; i < elements.length; i++) {
            new SimpleBar(elements[i] as HTMLElement);
        }*/
	}
	background(0);
    if (world.sandbox) {
        if (world.stackTrace) {
            if (!(window as any).errorMSG) {
            
                //(window as any).errorMSG = rewind(world.crashMSG);
            }
        } else {
            stepWorld();
        }
	}
    world.draw();
}

(window as any).setup = setup;
(window as any).draw = draw;

(window as any).beginTests = function (ctx: HTMLButtonElement) {
    let parent: HTMLElement = document.getElementById("testSelect");
    let testSelectInput: HTMLInputElement = parent.getElementsByClassName("testIndex")[0] as HTMLInputElement;
    let btnLeft: HTMLButtonElement = parent.getElementsByClassName("buttonLeft")[0] as HTMLButtonElement;
    let btnRight: HTMLButtonElement = parent.getElementsByClassName("buttonRight")[0] as HTMLButtonElement;

    let originalState = { //Save state of buttons
        left: btnLeft.disabled,
        right: btnRight.disabled,
        origLevel: testSelectInput.value
    };

    let origLevel: Object = { l: testSelectInput.valueAsNumber - 1 };
    (window as any).unlockFunc = function () { //Create unlocking function
        if (!originalState) return;
        editor.updateOptions({ readOnly: false });
        ctx.disabled = false;
        btnLeft.disabled = originalState.left;
        btnRight.disabled = originalState.right;
        testSelectInput.value = originalState.origLevel;
        testSelectInput.disabled = false;
        originalState = undefined;
        world.resetCallbacks();
        return origLevel;
    };

    editor.updateOptions({ readOnly: true }); //Lock
    ctx.disabled = true;
    btnLeft.disabled = true;
    btnRight.disabled = true;
    testSelectInput.disabled = true;

    let tested = 0;
    let max = parseInt(testSelectInput.max);

    world.resetCallbacks();
    world.on("testComplete", (world: World) => {
        if (++tested < max) {
            world.sandbox = undefined;
            world.stackTrace = undefined;
            world.actionBuffer = [];
            world.editorDeco = editor.deltaDecorations(world.editorDeco, []);
            if (++testSelectInput.valueAsNumber > max) {
                testSelectInput.value = testSelectInput.min;
            }
            world.loadLevel(world.json, testSelectInput.valueAsNumber - 1);
            world.loadCode(editor.getValue());
        } else {
            if (confirm("You have completed this puzzle!\nPress OK to advance to the next puzzle.")) {
                let next = (new URL(document.URL)).searchParams.get("nx").split("|");
                window.open("/play/?map=" + next.shift() + "&nx=" + next.join("|"), "_self");
            }
            (window as any).resetState();
        }
    });

    world.loadLevel(world.json, testSelectInput.valueAsNumber - 1);
    world.loadCode(editor.getValue());
};

(window as any).resetState = function () {
    if ((window as any).unlockFunc === undefined) return;
    let l = (window as any).unlockFunc().l;
    world.sandbox = undefined;
    world.stackTrace = undefined;
    world.actionBuffer = [];
    world.editorDeco = editor.deltaDecorations(world.editorDeco, []);
    world.loadLevel(world.json, l);
};

(window as any).testsSelectorHandler = function (ctx: HTMLElement) {
    let btnLeft: HTMLButtonElement = ctx.parentElement.getElementsByClassName("buttonLeft")[0] as HTMLButtonElement;
    let btnRight: HTMLButtonElement = ctx.parentElement.getElementsByClassName("buttonRight")[0] as HTMLButtonElement;
    let testSelectInput: HTMLInputElement = ctx.parentElement.getElementsByClassName("testIndex")[0] as HTMLInputElement;
    if (ctx.className == "buttonLeft") {
        testSelectInput.stepDown();
    }
    if (ctx.className == "buttonRight") {
        testSelectInput.stepUp();
    }
    testSelectInput.valueAsNumber = Math.min(testSelectInput.valueAsNumber, parseInt(testSelectInput.max));
    testSelectInput.valueAsNumber = Math.max(testSelectInput.valueAsNumber, parseInt(testSelectInput.min));
    btnLeft.disabled = testSelectInput.value == testSelectInput.min;
    btnRight.disabled = testSelectInput.value == testSelectInput.max;
    world.loadLevel(world.json, testSelectInput.valueAsNumber - 1);
};

(window as any).onWorldReady = function () {
    let parent: HTMLElement = document.getElementById("testSelect");
    let testSelectInput: HTMLInputElement = parent.getElementsByClassName("testIndex")[0] as HTMLInputElement;
    testSelectInput.max = JSON.parse(world.json).tests.length + "";
    testSelectInput.min = "1";
    if ((new URL(document.URL)).searchParams.get("editorMode")) {
        EditorMode.init_editor(editor);
    }  
};

function rewind(error) {
    //let rewound = error.mess;
    return error;
}
/*
//Code here excecutes once
var fib = [];
while(!done()){
    fib.push(!fib[2]?fib.length:fib[fib.length-1]+fib[fib.length-2]);
    log(fib[fib.length-1]);
}
*/