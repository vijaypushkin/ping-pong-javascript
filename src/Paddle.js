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

    rect() {
        return this.paddleElem.getBoundingClientRect();
    }

    init() {
        this.position = 50;
    }

    setDirection(direction) {
        this.direction = direction;
    }

    update(deltaTime) {
        // ? if the paddle hits the top or bottom of the screen, stop moving
        if (this.position <= 0) {
            this.position = 0
        } else if (this.position >= 100) {
            this.position = 100
        }


        if (this.direction === DIRECTION.UP) {
            this.position -= PADDLE_VELOCITY * deltaTime;
        } else if (this.direction === DIRECTION.DOWN) {
            this.position += PADDLE_VELOCITY * deltaTime;
        }
    }
}
