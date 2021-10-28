import {MapRepository} from "../repository/MapRepository";
import {Collisions} from 'detect-collisions';
import {TileContent, WorldTile} from "../../model/entities/WorldTile";
import {StonePhysics} from "./objects/StonePhysics";
import {User} from "../../model/entities/User";
import {bounceIfCollides, updateCoords, updateSpeedForce} from "./EngineUtils";

export class World {

    private mapRep: MapRepository;
    private collisions: Collisions = new Collisions();

    constructor(mapRep: MapRepository) {
        this.mapRep = mapRep;
        this.initWorld();
    }

     tick(users: User[]) {
        users.forEach(user => {
            const controls = user.controls;
            const physics = user.physics;
            updateSpeedForce(controls, physics);
            updateCoords(physics);
        });
        // Перерасчет коллизий
        this.collisions.update();
        users.forEach(user => {
            bounceIfCollides(user.physics, this.collisions);
            this.mapRep.updateUserTile(user);
        });
    }

    addUser(user: User) {
        if (!user.physics) {
            user.physics = this.mapRep.getPlayerPhysics(user);
        }
        this.collisions.insert(user.physics.getBody());
    }

    private initWorld() {
        this.mapRep.getWorld().forEach((line: WorldTile[]) => {
            line.forEach((tile: WorldTile) => {
                if (tile.contents === TileContent.STONE) {
                    const tilePhysics = new StonePhysics(tile.globalX, tile.globalY);
                    tile.setBody(tilePhysics);
                    this.collisions.insert(tilePhysics.body);
                }
            });
        });
        this.collisions.update();
    }

}