class Tester {
    sandbox: Interpreter;
    results: Array<{ [key: string]: boolean }>;
    data: any;
    code: string;
    _initApi: (interpreter: Interpreter, scope: any) => void;
    constructor(world, code) {
        //console.log(code);
        let _this = this;
        this.data = {};
        let rootName: string = "_NATIVE_" + (Math.random() + "00000000000").slice(2, 12);
        //dumpFunc = `function ${dumpFunc}(arg){}`;
        function initApi(interpreter: Interpreter, scope) {
            interpreter.setProperty(scope, rootName + "_dump", interpreter.createNativeFunction(function (d: string, f: boolean) {
                _this.results.push({ d : f });
            }));
            interpreter.setProperty(scope, rootName + "_get", interpreter.createNativeFunction(function (d) {
                if (!_this.data[d]) {
                    _this.data[d] = interpreter.nativeToPseudo({ });
                }
                return _this.data[d];
            }));
            interpreter.setProperty(scope, "entities", interpreter.nativeToPseudo(world.entities));
            interpreter.setProperty(scope, "log", interpreter.createNativeFunction(console.log));
        }
        this.code = `function newTask(d,f){${rootName}_dump(d,f(${rootName}_get(d)))}${code}`;
        this._initApi = initApi;
    }
    test() {
        this.sandbox = new Interpreter(this.code, this._initApi);
        this.results = [];
        let c: boolean = true;
        let x: Interpreter.Stack;
        while (c) {
            x = this.sandbox.stateStack[this.sandbox.stateStack.length - 1];
            try{
                c = this.sandbox.step();
            } catch (e) {
                console.log(this.sandbox.getValue("entities"));
                console.error(e);
                console.log(this.code.slice(x.node.start, x.node.end));
            }
        };
        //this.sandbox.run();
        return this.results;
    }
}
export { Tester };