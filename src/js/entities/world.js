class World {
    constructor(canvas, width, height, tileSize, fps) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
        this.fps = fps;

        this.elements = [];

        this.renderer = new Renderer(canvas, this.elements);

        this.player = null;
        this.map = new CustomMap();
        this.interval = null;
    }

    start() {
        this.selectMap('map1');
    }

    input() {
        this.player.input();
    }

    update() {
        this.player.move();
        this.player.checkCollision(this.elements);
        this.player.checkOutBoundaries();

        this.renderer.render();
    }

    nextMap(direction) {
        switch (direction) {
            case "up": 
                this.selectMap(this.map.nextMapUp);
            break;

            case "right": 
                this.selectMap(this.map.nextMapRight);
            break;

            case "down": 
                this.selectMap(this.map.nextMapDown);
            break;

            case "left": 
                this.selectMap(this.map.nextMapLeft);
            break;
        }
    }

    selectMap(mapName) {
        clearInterval(this.interval);

        this.elements = [];
        this.canvas.width = this.width * this.tileSize;
        this.canvas.height = this.height * this.tileSize;

        this.map.getMapFromJson(mapName).then(() => {
            this.createMap();
            this.input();

            this.renderer.stack = this.elements;
            
            this.interval = setInterval(() => {
                this.update();
            }, this.fps);
        });
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

        Object.keys(this.map.layers).forEach(key => {
            for (let x = 0; x < this.width * this.tileSize; x += this.tileSize) {
                for (let y = 0; y < this.height * this.tileSize; y += this.tileSize) {
                    const indexX = (x / this.tileSize);
                    const indexY = (y / this.tileSize);
    
                    switch (this.map.layers[key][indexY][indexX]) {
                        case "P":
                            if (this.player) {
                                this.player.x = indexX * this.tileSize;
                                this.player.y = indexY * this.tileSize;
                            }
                            else {
                                this.player = new PlayerEntity(indexX * this.tileSize, indexY * this.tileSize, this.tileSize, this.tileSize, "", 5, "sprite", sprites.player, this);
                            }

                            this.elements.push(this.player);
                        break;
    
                        case "G":
                            this.elements.push(new Entity(x, y, this.tileSize, this.tileSize, "", 0, "sprite", sprites.grass));
                            break;
    
                        case "T":
                            this.elements.push(new Entity(x, y, this.tileSize, this.tileSize, "", 0, "sprite", sprites.tree, true));
                            break;
                    }
                }
            }
        })
    }
} 