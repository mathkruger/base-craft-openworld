class TextEntity extends Entity {
    constructor(x, y, color, font, text) {
        super(x, y, 0, 0, color, 0, "text", null, false);

        this.font = font;
        this.text = text;
    }
}