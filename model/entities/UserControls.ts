import { Vector } from 'vector2d';

export class UserControls {
    forceDirection: Vector;

    constructor(vector: Vector) {
        this.forceDirection = vector;
    }
}