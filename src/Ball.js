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

    update(deltaTime) {
        this.x += this.direction.x * deltaTime * BALL_VELOCITY
        this.y += this.direction.y * deltaTime * BALL_VELOCITY;

        const ballRect = this.ballElem.getBoundingClientRect();

        // ? if the ball hits the top or bottom of the screen, reverse the y direction
        if (ballRect.top <= 0 || ballRect.bottom >= window.innerHeight) {
            this.direction.y *= -1;
        }

        // ? if the ball hits the left or right of the screen, reverse the x direction
        if (ballRect.left <= 0 || ballRect.right >= window.innerWidth) {
            this.direction.x *= -1;
        }
    }
}