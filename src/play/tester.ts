interface testResult{
    desc: string,
    passed: boolean
}
class Tester {
    sandbox: Interpreter;
    results: testResult[];
    globalStorage: string;
    code: string;
    _initApi: (interpreter: Interpreter, scope: any) => void;
    constructor(world, code) {
        this.reset(world, code);
    }
    test() {
        this.globalStorage = this.sandbox ? JSON.stringify(this.sandbox.pseudoToNative(this.sandbox.value)) : "{}";
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
    reset(world, code) {
        let _this = this;
        let rootName: string = "_NATIVE_" + (Math.random() + "00000000000").slice(2, 12);
        //dumpFunc = `function ${dumpFunc}(arg){}`;
        function initApi(interpreter: Interpreter, scope) {
            interpreter.setProperty(scope, rootName + "_dump", interpreter.createNativeFunction(function (d: string, f: boolean) {
                _this.results.push({ "desc": d, "passed": f });
            }));
            interpreter.setProperty(scope, "entities", interpreter.nativeToPseudo(world.entities));
            interpreter.setProperty(scope, "log", interpreter.createNativeFunction(console.log));
        }
        this.code = `function newTask(d,f){if(!globalStorage[d]){globalStorage[d]={}};${rootName}_dump(d,f(globalStorage[d]))}${code}`;
        this._initApi = initApi;
        this.sandbox = undefined;
    }
}
export { Tester, testResult };