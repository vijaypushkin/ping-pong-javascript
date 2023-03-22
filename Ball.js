const POS_X = '--position-x';
const POS_Y = '--position-y';

// ? using this constant to control the speed of the ball
const VELOCITY = 0.01;

export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem;
    }

    get x() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue(POS_X));
    }

    set x(value) {
        this.ballElem.style.setProperty(POS_X, value);
    }

    get y() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue(POS_Y));
    }

    set y(value) {
        this.ballElem.style.setProperty(POS_Y, value);
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
        this.x += this.direction.x * deltaTime * VELOCITY;
        this.y += this.direction.y * deltaTime * VELOCITY;

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