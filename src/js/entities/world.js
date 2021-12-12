class World {
    constructor(canvas, width, height, fps) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.fps = fps;

        this.elements = [];

        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.renderer = new Renderer(canvas, this.elements, this.width, this.height);
    }

    start() {
        this.createGround();
        this.createPlayer();
        this.input();

        setInterval(() => {
            this.renderer.render();
        }, this.fps);
    }

    createPlayer() {
        this.elements.push(
            new PlayerEntity(150, 150, 30, 30, "rgb(255, 0, 0)", 20)
        );
    }

    createGround() {
        this.elements.push(
            new Entity(0, 0, this.height, this.width, "rgb(0, 255, 0)", 0)
        )
    }

    input() {
        document.addEventListener("keypress", (ev) => {
            this.elements.forEach(el => {
                el.move(ev.key);
            });
        })
    }
} 