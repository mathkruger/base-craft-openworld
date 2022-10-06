class HealthPotion extends Item {
    constructor(x, y, height, width, action) {
        super(
            x,
            y,
            height,
            width,
            "",
            0,
            "sprite",
            new Sprite(0, 0, width, height, "potion"),
            true,
            2, "Health Potion",
            1,
            action
        );
    }
}