import { Body } from 'detect-collisions';
import { AbstractVector } from 'vector2d';

export enum WorldObjectType {
    STONE, USER
}

export interface WorldObject {
    getType(): WorldObjectType;
    isStatic(): boolean;
    getBody(): Body;
    getSpeed(): AbstractVector;
    getForce(): AbstractVector;
    setSpeed(speed: AbstractVector);
    setForce(force: AbstractVector);
}