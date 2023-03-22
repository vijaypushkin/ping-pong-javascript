import Ball from "./Ball.js";
// import Paddle from "./Paddle";

const ball = new Ball(document.getElementById('ball'));

// const paddle1 = new Paddle(document.getElementById('paddle1'));
// const paddle2 = new Paddle(document.getElementById('paddle2'));

let lastTime = 0;

const initialize = () => {
    ball.init();
    // paddle1.init();
    // paddle2.init();

    requestAnimationFrame(gameLoop);
}

const gameLoop = (timeStamp) => {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    ball.update(deltaTime);
    // paddle1.update(deltaTime);
    // paddle2.update(deltaTime);

    requestAnimationFrame(gameLoop);
}

initialize();