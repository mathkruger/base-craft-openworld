class Item extends Entity {
    constructor(x, y, height, width, color, speed, renderMode, sprite, isSolid, id, name, quantity, action) {
        super(x, y, height, width, color, speed, renderMode, sprite, isSolid);

        this.id = id;
        this.name = name;
        this.quantity = quantity;

        this.action = action || (() => { });
    }
}