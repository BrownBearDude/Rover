interface SubWindowOptionsObject {
    padding?: string
}

class SubWindow{
    public div: HTMLDivElement;
    public content: HTMLDivElement;
    public innerDiv: HTMLDivElement;
    public header: HTMLDivElement;
    
    constructor() {
        this.div = document.createElement("div");
        this.innerDiv = document.createElement("div");
        this.content = document.createElement("div");
        this.header = document.createElement("div");

        //Div
        this.setPadding(10);
        this.div.style.backgroundColor = "#00FF00";
        this.div.style.position = "absolute";
        this.div.style.display = "flex";
        
        //Content
        this.content.style.backgroundColor = "#FF0000";

        this.header.style.top = "0px";
        this.content.style.bottom = "0px";

        this.innerDiv.appendChild(this.header);
        this.innerDiv.appendChild(this.content);
        this.div.appendChild(this.innerDiv);
    }

    public setPadding(padding: number) {
        this.div.style.padding = padding + "px";
        return this; //For chaining
    }

    public setHeaderHeight(height: number) {
        this.header.style.height = height + "%";
        this.content.style.height = 100 - height + "%";
    }

    public resize(width: number, height: number) {
        this.div.style.width = width + "%";
        this.div.style.height = height + "%";
        return this; //For chaining
    }

    public moveTo(left: number, top: number) {
        this.div.style.left = left + "%";
        this.div.style.top = top + "%";
        return this; //For chaining
    }

    private onBorderClick() {
        console.log("Border clicked!");
    }
}
export { SubWindow };