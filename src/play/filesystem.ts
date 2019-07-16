function addFile(path: string, name: string, data: string) {
    add(path, name, data);
}

function addFolder(path: string, name: string) {
    add(path, name, {});
}

function remove(path: string) {
    let p = path.split(/[\\/]+/);
    let root = getFS();
    let lastElem = root;
    p.forEach((e, i) => {
        if (e.length) {
            if (typeof lastElem[e] == "object") {
                lastElem = lastElem[e];
            } else {
                delete lastElem[e];
                setFS(root);
                return;
            }
        }
    });
}

function add(path: string, name: string, data: any) {
    let x = getPath(path);
    if (typeof x.path != "object") {
        throw new Error("Path is not to folder");
    }
    x.path[name] = data;
    setFS(x.root);
}

function getFS(): Object {
    let fs = localStorage.getItem("FileSystem");
    return fs == null ? {} : JSON.parse(fs);
}

function setFS(obj: Object) {
    localStorage.setItem("FileSystem", JSON.stringify(obj));
}

function getPath(path: string): getPathReturn {
    let root = getFS();
    return { root, path: path.split(/[\\/]+/).reduce((a, c) => (c.length ? a[c] : a), root) };
}

interface getPathReturn {
    root: Object,
    path: any
}
export { addFile, addFolder, getPath, remove };