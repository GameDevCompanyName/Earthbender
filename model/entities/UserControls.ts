import { AbstractVector, Vector } from 'vector2d';

export class UserControls {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getForceVector() : AbstractVector {
        return new Vector(this.x, this.y);
    }
}