import {WorldObject, WorldObjectType} from "./WorldObject";
import {Polygon} from 'detect-collisions';
import {Vector} from 'vector2d';
import {TILE_SIZE} from "../World";

const HALF_TILE = TILE_SIZE / 2;
export const STONE_POLYGON_POINTS = [
    [-HALF_TILE, -HALF_TILE],
    [+HALF_TILE, -HALF_TILE],
    [+HALF_TILE, +HALF_TILE],
    [-HALF_TILE, +HALF_TILE],
];

export class StonePhysics implements WorldObject {
    body: Polygon;

    constructor(globalX: number, globalY: number) {
        this.body = new Polygon(
            globalX * TILE_SIZE + HALF_TILE,
            globalY * TILE_SIZE + HALF_TILE,
            STONE_POLYGON_POINTS
        );
    }

    getBody() {
        return this.body;
    }

    getForce() {
        return new Vector(0, 0);
    }

    getSpeed() {
        return new Vector(0, 0);
    }

    getType(): WorldObjectType {
        return WorldObjectType.STONE;
    }

    isStatic(): boolean {
        return true;
    }

    setSpeed(speed: Vector) {
        throw new Error("Cannot set force for static Object");
    }

    setForce(force: Vector) {
        throw new Error("Cannot set force for static Object");
    }

}