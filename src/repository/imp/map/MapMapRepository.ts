import {MapRepository} from "../../MapRepository";
import {User} from "../../../../model/entities/User";
import {UserPhysics} from "../../../world/objects/UserPhysics";
import {TileContent, WorldTile} from "../../../../model/entities/WorldTile";
import {UserId} from "../../../../model/entities/UserId";
import {Polygon} from 'detect-collisions';

export class MapMapRepository implements MapRepository {

    map: WorldTile[][] = createBorderWorld();
    players: Map<UserId, UserPhysics> = new Map<UserId, UserPhysics>();
    startTile: WorldTile = this.map[2][2];

    getPlayerPhysics(user: User): UserPhysics {
        if (this.players.has(user.id)) {
            return this.players.get(user.id);
        } else {
            const physics = new UserPhysics(
                new Polygon(
                    this.startTile.globalX,
                    this.startTile.globalY,
                    [
                        [-10, -10],
                        [10, -10],
                        [10, 10],
                        [-10, 10]
                    ]
                )
            );
            user.physics = physics;
            return physics;
        }
    }

    getWorld(): WorldTile[][] {
        return this.map;
    }

    updateUserTile(user: User) {

    }

}

function createPlayerPhysics(user: User) {

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