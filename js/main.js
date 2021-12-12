const FPS = 10;
const canvas = document.getElementById("main-game");
const world = new World(canvas, 800, 600, FPS);

console.log("Game Start!");
world.start();