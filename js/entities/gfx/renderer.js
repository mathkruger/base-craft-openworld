class Renderer {
    constructor(canvas, stack, screenWidth, screenHeight) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.stack = stack;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
    }

    render() {
        this.clearScreen();
        this.stack.forEach(element => {
            const x = element.x > this.screenWidth ? this.screenWidth : element.x;
            const y = element.y > this.screenHeight ? this.screenHeight : element.y;
            this.context.fillStyle = element.color;
            this.context.fillRect(x, y, element.width, element.height);
        });
    }

    clearScreen(x = 0, y = 0, width = this.screenWidth, height = this.screenHeight) {
        this.context.clearRect(x, y, width, height);
    }
}