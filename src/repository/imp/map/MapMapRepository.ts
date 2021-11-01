import {MapRepository} from "../../MapRepository";
import {User} from "../../../../model/entities/User";
import {UserPhysics} from "../../../world/objects/UserPhysics";
import {TileContent, WorldTile} from "../../../../model/entities/WorldTile";
import {UserId} from "../../../../model/entities/UserId";
import {Polygon} from 'detect-collisions';
import {Environment} from "../../../../model/messages/Environment";
import {GameConfig} from "../../../GameConfig";
import {WorldObject} from "../../../world/objects/WorldObject";
import {generateWorld} from "../../../generation/WorldGenerator";

export class MapMapRepository implements MapRepository {

    config: GameConfig = new GameConfig();

    players: Map<UserId, UserPhysics> = new Map<UserId, UserPhysics>();
    userToTile: Map<UserPhysics, WorldTile> = new Map<UserPhysics, WorldTile>();
    tileToUsers: Map<WorldTile, Set<UserPhysics>> = new Map<WorldTile, Set<UserPhysics>>();
    map: WorldTile[][] = this.createBorderWorld();
    startTile: WorldTile = this.map[2][2];

    constructor() {
        this.map = generateWorld();
    }

    getPlayerPhysics(user: User): UserPhysics {
        if (this.players.has(user.id)) {
            return this.players.get(user.id);
        } else {
            const physics = this.createPlayerPhysics(user);
            user.physics = physics;
            this.updateUserTile(user);
            return physics;
        }
    }

    getWorld(): WorldTile[][] {
        return this.map;
    }

    updateUserTile(user: User) {
        const physics = user.physics;

        const prevTile = this.userToTile.get(physics);
        const newTile = this.getTileForUser(user);

        if (prevTile == newTile) {
            return;
        }

        if (prevTile) {
            const prevSet: Set<UserPhysics> = this.tileToUsers.get(prevTile);
            if (prevSet) {
                prevSet.delete(physics);
                if (prevSet.size < 1) {
                    this.tileToUsers.delete(prevTile);
                }
            }
            this.userToTile.delete(physics);
        }

        let newSet: Set<UserPhysics> = this.tileToUsers.get(newTile);
        if (!newSet) {
            newSet = new Set<UserPhysics>();
            this.tileToUsers.set(newTile, newSet);
        }
        newSet.add(physics);
        this.userToTile.set(physics, newTile);
    }

    getEnvironment(user: User): Environment {
        const objects: WorldObject[] = [];
        const centerTile: WorldTile = this.getTileForUser(user);
        const left_x = centerTile.globalX - this.config.ENVIRONMENT_OFFSET;
        const top_y = centerTile.globalY - this.config.ENVIRONMENT_OFFSET;

        for (let y = Math.max(top_y, 0); y < Math.min((top_y + this.config.ENVIRONMENT_SIZE), this.config.WORLD_HEIGHT); y++) {
            for (let x = Math.max(left_x, 0); x < Math.min((left_x + this.config.ENVIRONMENT_SIZE), this.config.WORLD_WIDTH); x++) {
                const currentTile = this.map[y][x];
                if (currentTile.contents === TileContent.STONE) {
                    objects.push(currentTile.physics);
                }
                const userSet = this.tileToUsers.get(currentTile);
                if (userSet) {
                    [...userSet.values()].forEach(physics => {
                        objects.push(physics);
                    });
                }
            }
        }

        return new Environment(objects, user.physics);
    }

    private createPlayerPhysics(user: User): UserPhysics {
        const physics = new UserPhysics(
            new Polygon(
                this.startTile.globalX * this.config.TILE_SIZE + this.config.HALF_TILE,
                this.startTile.globalY * this.config.TILE_SIZE + this.config.HALF_TILE,
                [
                    [-10, -10],
                    [10, -10],
                    [10, 10],
                    [-10, 10]
                ]
            ),
            user.id
        );
        return physics;
    }

    private getTileForUser(user: User): WorldTile {
        const globalX = Math.round((user.physics.body.x - this.config.HALF_TILE) / this.config.TILE_SIZE) - 1;
        const globalY = Math.round((user.physics.body.y - this.config.HALF_TILE) / this.config.TILE_SIZE) - 1;
        return this.map[globalY][globalX];
    }

    private createBorderWorld(): WorldTile[][] {
        const world: WorldTile[][] = [];
        for (let y = 0; y < this.config.WORLD_HEIGHT; y++) {
            const line: WorldTile[] = [];
            for (let x = 0; x < this.config.WORLD_WIDTH; x++) {
                let tile: WorldTile;
                if (x === 0 || x === this.config.WORLD_WIDTH - 1 || y === 0 || y === this.config.WORLD_HEIGHT - 1) {
                    tile = new WorldTile(x, y, TileContent.STONE);
                } else {
                    tile = new WorldTile(x, y, TileContent.NOTHING);
                }
                line.push(tile);
            }
            world.push(line);
        }
        return world;
    }

}