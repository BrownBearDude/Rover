import * as acorn from "../lib/acorn";
interface testResult{
    task: string,
    passed: boolean
}
class Tester {
    private sandbox: Interpreter;
    public results: testResult[];
    private globalStorage: string;
    private code: string;
    _initApi: (interpreter: Interpreter, scope: any) => void;
    constructor(world, code) {
        this.reset(world, code);
    }
    test() {
        this.globalStorage = this.sandbox ? JSON.stringify(this.sandbox.pseudoToNative(this.sandbox.value)) : "{}";
        //console.log(`var globalStorage = ${this.globalStorage};${this.code};globalStorage;`);
        this.sandbox = new Interpreter(`var globalStorage = ${this.globalStorage};${this.code};globalStorage;`, this._initApi);
        this.results = [];
        let c: boolean = true;
        let x: Interpreter.Stack;
        while (c) {
            x = this.sandbox.stateStack[this.sandbox.stateStack.length - 1];
            try{
                c = this.sandbox.step();
            } catch (e) {
                //console.log(this.sandbox.getValueFromScope("entities"));
                console.error(e);
                console.log(`var globalStorage = ${this.globalStorage};${this.code};globalStorage;`.slice(x.node.start, x.node.end));
            }
        };
        //this.sandbox.run();
        return this.results;
    }
    reset(world, code, again = true) {
        let _this = this;
        let rootName: string = "_NATIVE_" + (Math.random() + "00000000000").slice(2, 12);
        //dumpFunc = `function ${dumpFunc}(arg){}`;
        function initApi(interpreter: Interpreter, scope) {
            interpreter.setProperty(scope, rootName + "_dump", interpreter.createNativeFunction(function (f) {
                _this.results.push(_this.sandbox.pseudoToNative(f));
            }));
            interpreter.setProperty(scope, "entities", interpreter.nativeToPseudo(world.entities));
            interpreter.setProperty(scope, "log", interpreter.createNativeFunction(console.log));
        }
        this.code = `function newTask(d,f){if(!globalStorage[d]){globalStorage[d]={}};${rootName}_dump(f(globalStorage[d]))}${code}`;
        this._initApi = initApi;
        this.sandbox = undefined;
        if (again) {
            this.test();
            this.reset(world, code, false);
        }
    }
}
export { Tester, testResult };