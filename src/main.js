import Ball from "./Ball.js";
import Paddle from "./Paddle.js";
import {DIRECTION} from "./constants.js";

const ball = new Ball(document.getElementById('ball'));

const paddle1 = new Paddle(document.getElementById('paddle1'));
const paddle2 = new Paddle(document.getElementById('paddle2'));

let lastTime = 0;

const initialize = () => {
    ball.init();
    paddle1.init();
    paddle2.init();

    addEventListeners();
    requestAnimationFrame(gameLoop);
}

const addEventListeners = () => {
    document.addEventListener('keydown', (event) => {
        if (event.code === 'KeyW') {
            paddle1.setDirection(DIRECTION.UP);
        }

        if (event.code === 'KeyS') {
            paddle1.setDirection(DIRECTION.DOWN);
        }

        if (event.code === 'ArrowUp') {
            paddle2.setDirection(DIRECTION.UP);
        }

        if (event.code === 'ArrowDown') {
            paddle2.setDirection(DIRECTION.DOWN);
        }

    })

    document.addEventListener('keyup', (event) => {
        if (event.code === 'KeyW' || event.code === 'KeyS') {
            paddle1.setDirection(DIRECTION.IDLE);
        }

        if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
            paddle2.setDirection(DIRECTION.IDLE);
        }

    })
}

const gameLoop = (timeStamp) => {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    ball.update(deltaTime);
    paddle1.update(deltaTime);
    paddle2.update(deltaTime);

    requestAnimationFrame(gameLoop);
}

initialize();