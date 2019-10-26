export function create_tutorial(): void {
    const canvas = document.createElement("canvas") as HTMLCanvasElement;
    canvas.style.left = "0";
    canvas.style.top = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.position = "absolute";
    canvas.oncontextmenu = e => e.preventDefault();
    document.body.append(canvas);
    let cutout: HTMLElement;

    const ctx = canvas.getContext("2d");
    function updateCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (cutout) {
            const rect = cutout.getBoundingClientRect();
            ctx.clearRect(rect.left, rect.top, rect.width, rect.height);
        }
    }

    const tutorial: tutorial_data[] = [
        {
            title: "Welcome!",
            text: "This tutorial will take you through how Rover works.",
            cutout: null,
            style: "left: 50%; top: 50%; width: 25%; transform:translate(-50%, -50%);"
        }, {
            title: "This is Rover",
            text: "Rover is a platform for learning code through interactive environments with immediate feedback. Just type in code and run it in our interactive environment.",
            cutout: null,
            style: "left: 50%; top: 50%; width: 25%; transform:translate(-50%, -50%);"
        }, {
            title: "The Environment",
            text: "This is the environment which you run your code in. You can control \"Bots\" in here through code.",
            cutout: document.getElementById("canvasContainer"),
            style: "left: 50%; bottom: 1%; width: 25%; transform:translate(-50%, 0%);"
        }
    ];

    const tutorial_box = document.createElement("div");
    function set_tutorial_box_style(element: HTMLElement) {
        element.style.position = "absolute";
        element.style.backgroundColor = "grey";
        element.style.borderStyle = "solid";
        element.style.borderColor = "black";
        element.style.borderWidth = "5px";
    }

    const tutorial_box_title = document.createElement("p");
    tutorial_box_title.style.fontSize = "24px";
    tutorial_box_title.style.margin = "4px";
    tutorial_box.append(tutorial_box_title);

    const tutorial_box_text = document.createElement("p");
    tutorial_box_text.style.margin = "4px";
    tutorial_box.append(tutorial_box_text);

    const tutorial_box_buttons = document.createElement("div");
    tutorial_box_buttons.style.left = "0px";
    tutorial_box_buttons.style.right = "0px";

    function new_tutorial_box_button(text: string) {
        const button = document.createElement("button");
        button.style.position = "relative";
        button.style.top = "0px";
        button.style.height = "100%";
        button.style.width = "50%";
        button.innerText = text;
        return button;
    }

    const tutorial_box_button_back = new_tutorial_box_button("<");
    tutorial_box_button_back.style.left = "0px";
    tutorial_box_buttons.append(tutorial_box_button_back);

    const tutorial_box_button_next = new_tutorial_box_button(">");
    tutorial_box_button_next.style.right = "0px";
    tutorial_box_buttons.append(tutorial_box_button_next);

    tutorial_box.append(tutorial_box_buttons);

    function render_box(index: number) {
        const box_data = tutorial[index];
        tutorial_box.setAttribute("style", box_data.style);
        set_tutorial_box_style(tutorial_box);
        tutorial_box_title.innerText = box_data.title;
        tutorial_box_text.innerText = box_data.text;
        cutout = box_data.cutout;
        tutorial_box_button_back.onclick = () => { if (index > 0) render_box(index - 1) };
        tutorial_box_button_next.onclick = () => index + 1 < tutorial.length ? render_box(index + 1) : finish_tutorial();
        updateCanvas();
    }

    document.body.append(tutorial_box);

    window.addEventListener("resize", updateCanvas);
    render_box(0);

    function finish_tutorial() {
        window.removeEventListener("resize", updateCanvas);
        canvas.remove();
        tutorial_box.remove();
    }
}

interface tutorial_data {
    title: string,
    text: string,
    cutout: HTMLElement,
    style: string
}