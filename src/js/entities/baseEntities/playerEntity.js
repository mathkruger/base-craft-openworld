class PlayerEntity extends Entity {
    constructor(x, y, height, width, color, speed, renderMode, sprites, world = null) {
        super(x, y, height, width, color, speed, renderMode);

        this.sprites = sprites;
        this.sprite = this.sprites[0];
        this.world = world;

        this.isMoving = false;
        this.lastDirection = "s";
        this.collideDirection = "";
        this.isSolid = true;
        this.isWrapping = false;

        this.isInventoryOpen = false;
        this.inventory = new Inventory([], 10);

        this.slots = {
            tool: new Entity()
        };

        this.isUsingTool = false;
    }

    input() {
        document.addEventListener("keypress", (ev) => {
            if (['a', 's', 'w', 'd'].includes(ev.key.toLowerCase())) {
                if (ev.key.toLowerCase() !== this.collideDirection) {
                    this.isMoving = true;
                    this.lastDirection = ev.key.toLowerCase();
                }
            }
            else {
                if (ev.key.toLowerCase() === 'i') {
                    this.toggleInventory()
                } else if (ev.key.toLowerCase() === ' ') {
                    this.useTool();
                }
            }
        });

        document.addEventListener("keyup", (ev) => {
            this.isMoving = false;
        });
    }

    inventoryInput() {
        document.addEventListener("keydown", (ev) => {
            if (this.isInventoryOpen) {
                if (['w', 's', 'enter'].includes(ev.key.toLocaleLowerCase())) {
                    const key = ev.key.toLowerCase();

                    switch (key) {
                        case "w":
                            this.inventory.selectedItem = this.inventory.selectedItem == 0 ? 0 : this.inventory.selectedItem - 1;
                        break;

                        case "s":
                            this.inventory.selectedItem = this.inventory.selectedItem == this.inventory.items.length - 1 ? this.inventory.selectedItem : this.inventory.selectedItem + 1;
                        break;
                        
                        case "enter":
                            this.inventory.useItem();    
                        break;
                    }

                    this.world.updateInventory();
                }
            }
        });
    }

    toggleInventory() {
        this.isInventoryOpen = !this.isInventoryOpen;
        this.inventory.selectedItem = 0;
        if (this.isInventoryOpen) {
            this.world.createInventory();
        }
        else {
            this.world.destroyInventory();
        }
    }

    useTool() {
        switch (this.lastDirection) {
            case "w":
                this.slots.tool.x = this.x;
                this.slots.tool.y = this.y - this.height - 10;
            break;

            case "s":
                this.slots.tool.x = this.x;
                this.slots.tool.y = this.y + this.height + 10;
            break;

            case "a":
                this.slots.tool.y = this.y;
                this.slots.tool.x = this.x - this.width - 10;
            break;

            case "d":
                this.slots.tool.y = this.y;
                this.slots.tool.x = this.x + this.width + 10;
            break;
             
        }

        this.isUsingTool = true;
        this.world.elements.push(this.slots.tool);

        setTimeout(() => {
            this.world.elements.splice(this.world.elements.findIndex(x => x === this.slots.tool), 1);
            this.isUsingTool = false;
        }, 300);
    }

    move() {
        if (this.isMoving) {
            if (this.lastDirection === "s") {
                this.y += this.speed;
                this.sprite = this.sprites[0];
            }

            if (this.lastDirection === "a") {
                this.x -= this.speed;
                this.sprite = this.sprites[1];
            }

            if (this.lastDirection === "d") {
                this.x += this.speed;
                this.sprite = this.sprites[2];
            }

            if (this.lastDirection === "w") {
                this.y -= this.speed;
                this.sprite = this.sprites[3];
            }
        }
    }

    checkOutBoundaries() {
        if (!this.isWrapping) {
            if (this.x > this.world.width * this.world.tileSize) {
                this.world.nextMap("right");
                this.isWrapping = true;
            }
            else if (this.x + this.width < 0) {
                this.world.nextMap("left");
                this.isWrapping = true;
            }
            else if (this.y > this.world.height * this.world.tileSize) {
                this.world.nextMap("down");
                this.isWrapping = true;
            }
            else if (this.y + this.height < 0) {
                this.world.nextMap("up");
                this.isWrapping = true;
            }
        }
    }

    checkCollision(items) {
        const isColliding = items.find(el => {
            return el !== this && el.isSolid &&
                this.x < (el.x + el.width) - 5 &&
                this.x + this.width > el.x &&
                this.y < (el.y + el.height) - 5 &&
                this.y + this.height > el.y;
        });

        if (isColliding) {
            if (isColliding instanceof Item && !this.isUsingTool) {
                this.inventory.addItem(isColliding);
                items.splice(items.findIndex(x => x === isColliding), 1);
            }
            else {
                this.isMoving = false;
                this.collideDirection = this.lastDirection;

                if (this.lastDirection === "s") {
                    this.y -= this.speed;
                }

                if (this.lastDirection === "a") {
                    this.x += this.speed;
                }

                if (this.lastDirection === "d") {
                    this.x -= this.speed;
                }

                if (this.lastDirection === "w") {
                    this.y += this.speed;
                }
            }
        }
        else {
            this.collideDirection = "";
        }
    }
}