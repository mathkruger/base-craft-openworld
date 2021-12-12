class Entity {
    constructor(x, y, height, width, color, speed, renderMode = "rect", sprite = null) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = color;
        this.speed = speed;
        this.renderMode = renderMode;
        this.sprite = sprite;
    }

    move(key) { }
}