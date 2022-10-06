class Sword extends Item {
    constructor(x, y, height, width, action) {
        super(
            x,
            y,
            height,
            width,
            "",
            0,
            "sprite",
            new Sprite(0, 0, width, height, "sword"),
            true,
            1, "Sword",
            1,
            action
        );
    }
}