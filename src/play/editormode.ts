import { World } from "./world";
import * as monaco from "monaco-editor/esm/vs/editor/editor.main";

export class EditorMode {
    static world: World;
    static canvas: HTMLCanvasElement;
    static editor: monaco.editor.IStandaloneCodeEditor;
    static editorJSONValid: boolean;
    static init_canvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        canvas.addEventListener("click", () => {
            if (this.world.ready() === "ready" && this.world.snapTo && this.editorJSONValid) {
                
            }
        }, false);
    }
    static init_editor(editor: monaco.editor.IStandaloneCodeEditor) {
        this.editor = editor;
        editor.getModel().onDidChangeContent(() => {
            if (this.world.ready() !== "ready") return;
            try {
                const json = editor.getValue();
                JSON.parse(json);
                this.world.json = json;
                this.world.loadLevel(this.world.json, 0);
            } catch (err) {

            }
        });
        editor.setValue(this.world.json);
    }
    static init_world(world: World) {
        this.world = world;
    }
}