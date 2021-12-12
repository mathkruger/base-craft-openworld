class Entity {
    constructor(x, y, height, width, color, speed, renderMode = "rect", sprite = null, isSolid = false) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = color;
        this.speed = speed;
        this.renderMode = renderMode;
        this.sprite = sprite;
        this.isSolid = isSolid;
    }

    move(key) { }

    checkCollision(items) { }
}