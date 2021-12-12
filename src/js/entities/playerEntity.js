class PlayerEntity extends Entity {
    constructor(x, y, height, width, color, speed, renderMode, sprites) {
        super(x, y, height, width, color, speed, renderMode);

        this.sprites = sprites;
        this.sprite = this.sprites[0];

        this.isMoving = false;
        this.lastDirection = "s";
    }

    input() {
        document.addEventListener("keydown", (ev) => {
            this.isMoving = true;
            this.lastDirection = ev.key.toLowerCase();
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
}