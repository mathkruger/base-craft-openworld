class World {
    constructor(canvas, width, height, tileSize, fps) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
        this.fps = fps;

        this.elements = [];
        this.inventoryElements = [];

        this.renderer = new Renderer(canvas, this.elements);

        this.player = null;
        this.map = new CustomMap();
        this.interval = null;
    }

    start() {
        this.selectMap('grassCity/map1', () => {
            this.interval = setInterval(() => {
                this.update();
            }, this.fps);
        });
    }

    input() {
        this.player.input();
        this.player.inventoryInput();
    }

    update() {
        if (!this.player.isInventoryOpen) {
            this.player.move();
            this.player.checkCollision(this.elements);
            this.player.checkOutBoundaries();
        }

        this.renderer.render();
    }

    nextMap(direction) {
        switch (direction) {
            case "up":
                this.player.y = (this.height * this.tileSize) - this.player.height;
                this.selectMap(this.map.nextMapUp);
                break;

            case "right":
                this.player.x = this.tileSize;
                this.selectMap(this.map.nextMapRight);
                break;

            case "down":
                this.player.y = this.tileSize;
                this.selectMap(this.map.nextMapDown);
                break;

            case "left":
                this.player.x = (this.width * this.tileSize) - this.player.width;
                this.selectMap(this.map.nextMapLeft);
                break;
        }
    }

    selectMap(mapName, gameLoop) {
        clearInterval(this.interval);

        this.elements = [];
        this.canvas.width = this.width * this.tileSize;
        this.canvas.height = this.height * this.tileSize;

        this.map.getMapFromJson(mapName).then(() => {
            this.createMap();
            this.input();

            this.renderer.stack = this.elements;
            this.player.isWrapping = false;

            gameLoop();
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

        const items = {
            healthPotion: (x, y) => new HealthPotion(x, y, this.tileSize, this.tileSize, () => {
                console.log("Yumyyyy");
            }),
            sword: (x, y) => new Sword(x, y, this.tileSize, this.tileSize, () => {
                this.player.slots.tool = this.player.inventory.items[this.player.inventory.selectedItem];
            })
        }

        this.elements.push(new Entity(0, 0, this.height * this.tileSize, this.width * this.tileSize, this.map.backgroundColor, 0, "rect"));

        Object.keys(this.map.layers).forEach(key => {
            for (let x = 0; x < this.width * this.tileSize; x += this.tileSize) {
                for (let y = 0; y < this.height * this.tileSize; y += this.tileSize) {
                    const indexX = (x / this.tileSize);
                    const indexY = (y / this.tileSize);

                    switch (this.map.layers[key][indexY][indexX]) {
                        case "P":
                            if (!this.player) {
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

                        case "H":
                            this.elements.push(items.healthPotion(x, y));
                            break;

                        case "S":
                            this.elements.push(items.sword(x, y));
                            break;
                    }
                }
            }
        })
    }

    updateInventory() {
        this.destroyInventory();
        this.createInventory();
    }

    createInventory() {
        const panelHeight = this.player.inventory.items.reduce((partial_sum, a) => partial_sum + a.height, 0) + (this.tileSize * 4)
        const inventoryPanel = new Entity(3 * this.tileSize, 3 * this.tileSize, panelHeight, this.tileSize * 4, "#444444", 0, "rect");
        const usedItemPanel = new Entity(inventoryPanel.x + inventoryPanel.width, inventoryPanel.y, 40, this.tileSize * 2, "#444444", 0, "rect");
        
        this.inventoryElements.push(inventoryPanel);
        this.inventoryElements.push(usedItemPanel);

        this.player.inventory.items.forEach((item, index) => {
            item.x = inventoryPanel.x + 5;
            item.y = inventoryPanel.y + (index * this.tileSize) + 5;

            this.inventoryElements.push(
                new TextEntity(item.x + item.width,
                    item.y + (item.height / 2),
                    this.player.inventory.selectedItem === index ? "red" : "white",
                    "12px serif",
                    item.name + " x" + item.quantity
                )
            );
            this.inventoryElements.push(item);
        });

        this.inventoryElements.push(
            new TextEntity(usedItemPanel.x + 5,
                usedItemPanel.y + 5,
                "red",
                "12px serif",
                this.player.slots.tool.name
            )
        );

        this.elements.push(...this.inventoryElements);

        this.renderer.render();
    }

    destroyInventory() {
        this.inventoryElements.forEach((x, index) => {
            if (this.elements.includes(x)) {
                this.elements.splice(this.elements.findIndex(y => y === x), 1);
            }
        });

        this.inventoryElements = [];
        this.renderer.render();
    }
}