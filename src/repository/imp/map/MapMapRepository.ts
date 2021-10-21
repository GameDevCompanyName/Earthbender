import {MapRepository} from "../../MapRepository";
import {User} from "../../../../model/entities/User";
import {UserPhysics} from "../../../world/objects/UserPhysics";
import {TileContent, WorldTile} from "../../../../model/entities/WorldTile";
import {UserId} from "../../../../model/entities/UserId";

export class MapMapRepository implements MapRepository {

    map: WorldTile[][];
    players: Map<UserId, UserPhysics>;

    constructor() {
        this.map = createBorderWorld();
    }

    getPlayerPhysics(user: User): UserPhysics {
        return undefined;
    }

    getWorld(): WorldTile[][] {
        return [];
    }

    updateUserTile(user: User) {
    }

}

function createBorderWorld(): WorldTile[][] {
    const size = 20;
    const world: WorldTile[][] = [];
    for (let y = 0; y < 20; y++) {
        const line: WorldTile[] = [];
        for (let x = 0; x < 20; x++) {
            if (x === 0 || x === size - 1 || y === 0 || y === size - 1) {
                line.push(new WorldTile(x, y, TileContent.STONE));
            } else {
                line.push(new WorldTile(x, y, TileContent.NOTHING));
            }
        }
        world.push(line);
    }
    return world;
}