import Ball from "./Ball.js";
import Paddle from "./Paddle.js";
import {DIRECTION} from "./constants.js";

const ball = new Ball(document.getElementById('ball'));

const paddle1 = new Paddle(document.getElementById('paddle1'));
const paddle2 = new Paddle(document.getElementById('paddle2'));

const score1 = document.getElementById('score1');
const score2 = document.getElementById('score2');

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

    paddle1.update(deltaTime);
    paddle2.update(deltaTime);
    const winner = ball.update(deltaTime, [paddle1.rect(), paddle2.rect()]);

    if (winner === 'left') {
        score1.innerText = `${parseInt(score1.innerText) + 1}`;
    }

    if (winner === 'right') {
       score2.innerText = `${parseInt(score2.innerText) + 1}`;
    }

    requestAnimationFrame(gameLoop);
}

initialize();