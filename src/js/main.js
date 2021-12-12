const FPS = 10;
const canvas = document.getElementById("main-game");
const tileSize = 48;
const width = 10;
const height = 10;
const world = new World(canvas, width, height, tileSize, FPS);

world.start();