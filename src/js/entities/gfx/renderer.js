class Renderer {
    constructor(canvas, stack) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.stack = stack;
    }

    render() {
        this.clearScreen();
        this.stack.forEach(element => {
            switch (element.renderMode) {
                default:
                case "rect":
                    this.createRect(element);
                    break;

                case "circle":
                    this.createCircle(element);
                    break;

                case "sprite":
                    this.createImage(element);
                    break;
            }
        });
    }

    createRect({ x, y, width, height, color }) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
    }

    createCircle({ x, y, width, color }) {
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(x, y, width, 0, 2 * Math.PI);
        this.context.fill();
    }

    createImage({ x, y, width, height, sprite }) {
        const image = document.getElementById(sprite.id);

        this.context.drawImage(image, x, y, width, height);
    }

    clearScreen(x = 0, y = 0, width = this.screenWidth, height = this.screenHeight) {
        this.context.clearRect(x, y, width, height);
    }
}