class World {
    constructor(canvas, width, height, tileSize, fps) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
        this.fps = fps;

        this.elements = [];

        this.canvas.width = this.width * this.tileSize;
        this.canvas.height = this.height * this.tileSize;
        this.renderer = new Renderer(canvas, this.elements);

        this.player = null;
    }

    start() {
        console.log("Game Start!");

        this.create();
        this.input();

        console.log(this.elements);

        setInterval(() => {
            this.update();
        }, this.fps);
    }

    create() {
        this.createGround();
        this.createTrees();
        this.createPlayer();
    }

    input() {
        this.player.input();
    }

    update() {
        this.player.move();
        this.renderer.render();
    }

    createPlayer() {
        const playerSprites = [
            new Sprite(0, 0, this.tileSize, this.tileSize, "player-down"),
            new Sprite(0, 0, this.tileSize, this.tileSize, "player-left"),
            new Sprite(0, 0, this.tileSize, this.tileSize, "player-right"),
            new Sprite(0, 0, this.tileSize, this.tileSize, "player-up")
        ];

        this.player = new PlayerEntity(150, 150, this.tileSize, this.tileSize, "", 3, "sprite", playerSprites);

        this.elements.push(this.player);
    }

    createGround() {
        const grassSprite = new Sprite(0, 0, this.tileSize, this.tileSize, "grass");
        
        this.elements.push(
            new Entity(0, 0, this.height * this.tileSize, this.width * this.tileSize, "#70c8a0", 0, "rect"),
            new Entity(3 * this.tileSize, 4 * this.tileSize, this.tileSize, this.tileSize, "", 0, "sprite", grassSprite),
            new Entity(3 * this.tileSize, 5 * this.tileSize, this.tileSize, this.tileSize, "", 0, "sprite", grassSprite),
            new Entity(3 * this.tileSize, 6 * this.tileSize, this.tileSize, this.tileSize, "", 0, "sprite", grassSprite),
            new Entity(4 * this.tileSize, 4 * this.tileSize, this.tileSize, this.tileSize, "", 0, "sprite", grassSprite),
            new Entity(4 * this.tileSize, 5 * this.tileSize, this.tileSize, this.tileSize, "", 0, "sprite", grassSprite),
            new Entity(4 * this.tileSize, 6 * this.tileSize, this.tileSize, this.tileSize, "", 0, "sprite", grassSprite),
            new Entity(5 * this.tileSize, 4 * this.tileSize, this.tileSize, this.tileSize, "", 0, "sprite", grassSprite),
            new Entity(5 * this.tileSize, 5 * this.tileSize, this.tileSize, this.tileSize, "", 0, "sprite", grassSprite),
            new Entity(5 * this.tileSize, 6 * this.tileSize, this.tileSize, this.tileSize, "", 0, "sprite", grassSprite),
        );
    }

    createTrees() {
        // const treeSprite = new Sprite(0, 0, this.tileSize, this.tileSize, "tree");

        // const quantity = Math.floor(Math.random() * (this.width * this.height)) + 1;
        // for (let i = 0; i < quantity; i++) {
        //     const x = Math.floor(Math.random() * (this.width * this.tileSize));
        //     const y = Math.floor(Math.random() * (this.height * this.tilesize));

        // }

        /*this.elements.push(
            new Entity(10, 20, this.tileSize, this.tileSize, "", 0, "sprite", treeSprite)
        )*/
    }
} 