class PlayerEntity extends Entity {
    constructor(x, y, height, width, color, speed) {
        super(x, y, height, width, color, speed);
    }

    move(key) {
        switch(key.toLowerCase()) {
            case "a":
                this.x -= this.speed;
            break;

            case "d":
                this.x += this.speed;
            break;

            case "w":
                this.y -= this.speed;
            break;

            case "s":
                this.y += this.speed;
            break;
        }
    }
}