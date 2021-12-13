const FPS = 30;
const canvas = document.getElementById("main-game");
const tileSize = 48;
const width = 15;
const height = 10;
const world = new World(canvas, width, height, tileSize, FPS);

world.start();