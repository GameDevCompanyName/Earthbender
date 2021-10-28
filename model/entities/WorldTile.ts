import {Polygon} from 'detect-collisions';
import {StonePhysics} from "../../src/world/objects/StonePhysics";

export enum TileContent {
    NOTHING, STONE
}

export class WorldTile {
    globalX: number;
    globalY: number;
    physics: StonePhysics;
    contents: TileContent;

    constructor(globalX: number, globalY: number, contents: TileContent) {
        this.globalX = globalX;
        this.globalY = globalY;
        this.contents = contents;
    }

    setBody(physics: StonePhysics) {
        this.physics = physics;
    }
}