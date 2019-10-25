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
            position: {
                left: "50%",
                top: "50%"
            }
        }, {
            title: "This is Rover",
            text: "Rover is a platform for learning code through interactive environments with immediate feedback.",
            cutout: null,
            position: {
                left: "50%",
                top: "50%"
            }
        }
    ];

    const tutorial_box = document.createElement("div");
    tutorial_box.style.position = "absolute";
    tutorial_box.style.backgroundColor = "grey";
    tutorial_box.style.borderStyle = "solid";
    tutorial_box.style.borderColor = "black";
    tutorial_box.style.borderWidth = "5px";

    const tutorial_box_title = document.createElement("p");
    tutorial_box_title.style.fontSize = "24px";
    tutorial_box_title.style.margin = "4px";
    tutorial_box.append(tutorial_box_title);

    const tutorial_box_text = document.createElement("p");
    tutorial_box_text.style.margin = "4px";
    tutorial_box.append(tutorial_box_text);

    function render_box(index: number) {
        const box_data = tutorial[index];
        tutorial_box.style.left = box_data.position.left;
        tutorial_box.style.top = box_data.position.top;
        tutorial_box_title.innerText = box_data.title;
        tutorial_box_text.innerText = box_data.text;
    }

    document.body.append(tutorial_box);

    render_box(0);

    window.addEventListener("resize", updateCanvas);
    updateCanvas();
}

interface tutorial_data {
    title: string,
    text: string,
    cutout: HTMLElement
    position: {
        left: string,
        top: string
    }
}