import * as sourceMap from "source-map/source-map";
//import * as Interpreter from "../lib/interpreter";
function run() {
    //window['Interpreter'] = Interpreter;
    sourceMap.SourceMapConsumer.initialize({ //Let source-map consume its wasm
        "lib/mappings.wasm": "https://unpkg.com/source-map@0.7.3/lib/mappings.wasm"
    });
}
export { run };