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
    private raw_code: string;
    _initApi: (sent_data: any) => (interpreter: Interpreter, scope: any) => void;
    constructor(world, code) {
        this.raw_code = code;
        this.reset(world);
    }
    test(sent_data) {
        this.globalStorage = this.sandbox ? JSON.stringify(this.sandbox.pseudoToNative(this.sandbox.value)) : "{}";
        //console.log(`var globalStorage = ${this.globalStorage};${this.code};globalStorage;`);
        this.sandbox = new Interpreter(`var globalStorage = ${this.globalStorage};${this.code};globalStorage;`, this._initApi(sent_data));
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
    reset(world, again = true) {
        const code = this.raw_code;
        const _this = this;
        const rootName: string = "_NATIVE_" + (Math.random() + "00000000000").slice(2, 12);
        //dumpFunc = `function ${dumpFunc}(arg){}`;
        function curryInitAPI(sent_data) {
            function initApi(interpreter: Interpreter, scope) {
                interpreter.setProperty(scope, rootName + "_dump", interpreter.createNativeFunction(function (f) {
                    _this.results.push(_this.sandbox.pseudoToNative(f));
                }));
                interpreter.setProperty(scope, "entities", interpreter.nativeToPseudo(world.entities));
                interpreter.setProperty(scope, "log", interpreter.createNativeFunction(console.log));
                interpreter.setProperty(scope, "sent_data", sent_data);
            }
            return initApi;
        }
        this.code = `function newTask(d,f){if(!globalStorage[d]){globalStorage[d]={}};${rootName}_dump(f(globalStorage[d]))}${code}`;
        this._initApi = curryInitAPI;
        this.sandbox = undefined;
        if (again) {
            this.test(null);
            this.reset(world, false);
        }
    }
}
export { Tester, testResult };