import {User} from "./User";
import {Body} from 'detect-collisions';

export enum TileContent {
    NOTHING, STONE
}

export class WorldTile {
    globalX: number;
    globalY: number;
    body: Body;
    contents: TileContent;
    users: Set<User>;

    constructor(globalX: number, globalY: number, contents: TileContent) {
        this.globalX = globalX;
        this.globalY = globalY;
        this.contents = contents;
        this.users = new Set<User>();
    }

    setBody(body: Body) {
        this.body = body;
    }
}