import {BALL_POS_X, BALL_POS_Y, BALL_VELOCITY} from "./constants.js";

export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem;
    }

    get x() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue(BALL_POS_X));
    }

    set x(value) {
        this.ballElem.style.setProperty(BALL_POS_X, value);
    }

    get y() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue(BALL_POS_Y));
    }

    set y(value) {
        this.ballElem.style.setProperty(BALL_POS_Y, value);
    }

    init() {
        this.x = 50;
        this.y = 50;

        const angle = Math.random() * 2 * Math.PI;
        this.direction = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
    }

    update(deltaTime, paddleRects) {
        let winner = null;
        this.x += this.direction.x * deltaTime * BALL_VELOCITY
        this.y += this.direction.y * deltaTime * BALL_VELOCITY;

        const ballRect = this.ballElem.getBoundingClientRect();

        // ? if the ball hits the top or bottom of the screen, reverse the y direction
        if (ballRect.top <= 0 || ballRect.bottom >= window.innerHeight) {
            this.direction.y *= -1;
        }

        // ? if the ball hits the left or right of the screen, reverse the x direction
        if (ballRect.left <= 0 || ballRect.right >= window.innerWidth) {
            winner = ballRect.left <= 0 ? 'right' : 'left';

            this.direction.x *= -1;
        }

        // ? if the ball hits the paddle, reverse the x direction
        if (paddleRects.some(rect => isColliding(ballRect, rect))) {
            this.direction.x *= -1;
        }

        return winner;
    }
}

const isColliding = (rect1, rect2) => {
    return (
        rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top
    )
}