class World {
    constructor(canvas, width, height, tileSize, fps) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
        this.fps = fps;

        this.elements = [];

        this.canvas.width = this.width * this.tileSize;
        this.canvas.height = this.height * this.tileSize;
        this.renderer = new Renderer(canvas, this.elements);

        this.player = null;
        this.map = [
            ['T', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'T',],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ',],
            [' ', ' ', 'G', 'G', ' ', ' ', ' ', 'G', ' ', ' ',],
            [' ', ' ', 'G', 'G', ' ', ' ', ' ', ' ', ' ', ' ',],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
            [' ', ' ', ' ', ' ', ' ', 'P', ' ', ' ', ' ', ' ',],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'T', ' ', ' ',],
            [' ', ' ', 'G', ' ', ' ', ' ', 'T', ' ', 'T', ' ',],
            [' ', 'G', ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' ',],
            ['T', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'T',]
        ];
    }

    start() {
        console.table(this.map);
        console.log("Game Start!");

        this.create();
        this.input();

        console.log(this.elements);

        setInterval(() => {
            this.update();
        }, this.fps);
    }

    create() {
        this.createMap();
    }

    input() {
        this.player.input();
    }

    update() {
        this.player.move();
        this.player.checkCollision(this.elements);
        this.renderer.render();
    }

    createMap() {
        const sprites = {
            player: [
                new Sprite(0, 0, this.tileSize, this.tileSize, "player-down"),
                new Sprite(0, 0, this.tileSize, this.tileSize, "player-left"),
                new Sprite(0, 0, this.tileSize, this.tileSize, "player-right"),
                new Sprite(0, 0, this.tileSize, this.tileSize, "player-up")
            ],
            grass: new Sprite(0, 0, this.tileSize, this.tileSize, "grass"),
            tree: new Sprite(0, 0, this.tileSize, this.tileSize, "tree")
        }

        this.elements.push(new Entity(0, 0, this.height * this.tileSize, this.width * this.tileSize, "#70c8a0", 0, "rect"));

        for (let x = 0; x < this.width * this.tileSize; x += this.tileSize) {
            for (let y = 0; y < this.height * this.tileSize; y += this.tileSize) {
                const indexX = (x / this.tileSize);
                const indexY = (y / this.tileSize);

                switch (this.map[indexY][indexX]) {
                    case "G":
                        this.elements.push(new Entity(x, y, this.tileSize, this.tileSize, "", 0, "sprite", sprites.grass));
                        break;

                    case "T":
                        this.elements.push(new Entity(x, y, this.tileSize, this.tileSize, "", 0, "sprite", sprites.tree, true));
                        break;
                }
            }
        }

        this.map.forEach((x, indexX) => {
            this.map[indexX].forEach((y, indexY) => {
                if (y === "P") {
                    this.player = new PlayerEntity(indexX * this.tileSize, indexY * this.tileSize, this.tileSize, this.tileSize, "", 3, "sprite", sprites.player);
                    this.elements.push(this.player);
                }
            });
        });
    }
} 