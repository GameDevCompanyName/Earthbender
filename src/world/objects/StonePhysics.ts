import {WorldObject, WorldObjectType} from "./WorldObject";
import {Polygon} from 'detect-collisions';
import {Vector, AbstractVector} from 'vector2d';
import {GameConfig} from "../../GameConfig";

const config: GameConfig = new GameConfig();

export const STONE_POLYGON_POINTS = [
    [-config.HALF_TILE, -config.HALF_TILE],
    [+config.HALF_TILE, -config.HALF_TILE],
    [+config.HALF_TILE, +config.HALF_TILE],
    [-config.HALF_TILE, +config.HALF_TILE],
];

export class StonePhysics implements WorldObject {
    body: Polygon;

    constructor(globalX: number, globalY: number) {
        this.body = new Polygon(
            globalX * config.TILE_SIZE + config.HALF_TILE,
            globalY * config.TILE_SIZE + config.HALF_TILE,
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

    setSpeed(speed: AbstractVector) {
        throw new Error("Cannot set force for static Object");
    }

    setForce(force: AbstractVector) {
        throw new Error("Cannot set force for static Object");
    }

}