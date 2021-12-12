class PlayerEntity extends Entity {
    constructor(x, y, height, width, color, speed, renderMode, sprites) {
        super(x, y, height, width, color, speed, renderMode);

        this.sprites = sprites;
        this.sprite = this.sprites[0];

        this.isMoving = false;
        this.lastDirection = "s";
        this.collideDirection = "";
        this.isSolid = true;
    }

    input() {
        document.addEventListener("keydown", (ev) => {
            if (ev.key.toLowerCase() !== this.collideDirection) {
                this.isMoving = true;
                this.lastDirection = ev.key.toLowerCase();
            }
        });

        document.addEventListener("keyup", (ev) => {
            this.isMoving = false;
        });
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

    checkCollision(items) {
        const isColliding = items.find(el => {
            return el !== this && el.isSolid &&
                this.x < el.x + el.width &&
                this.x + this.width > el.x &&
                this.y < el.y + el.height &&
                this.y + this.height > el.y;
        });

        if (isColliding) {
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
        else {
            this.collideDirection = "";
        }
    }
}