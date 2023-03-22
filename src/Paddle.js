import {DIRECTION, PADDLE_POS, PADDLE_VELOCITY} from "./constants.js";

export default class Paddle {
    direction = DIRECTION.IDLE;

    constructor(paddleElem) {
        this.paddleElem = paddleElem;
    }


    get position() {
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue(PADDLE_POS));
    }

    set position(value) {
        this.paddleElem.style.setProperty(PADDLE_POS, value);
    }

    init() {
        this.position = 50;
    }

    setDirection(direction) {
        this.direction = direction;
    }

    update(deltaTime) {
        const paddleRect = this.paddleElem.getBoundingClientRect();

        // ? if the paddle hits the top or bottom of the screen, stop moving
        if (paddleRect.top <= 0 || paddleRect.bottom >= window.innerHeight) {
            this.direction = DIRECTION.IDLE;
        }


        if (this.direction === DIRECTION.UP) {
            this.position -= PADDLE_VELOCITY * deltaTime;
        } else if (this.direction === DIRECTION.DOWN) {
            this.position += PADDLE_VELOCITY * deltaTime;
        }
    }



}