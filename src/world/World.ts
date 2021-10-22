import {MapRepository} from "../repository/MapRepository";
import { Collisions, Polygon, Body, Result } from 'detect-collisions';
import {WorldTile} from "../../model/entities/WorldTile";
import {StonePhysics} from "./objects/StonePhysics";
import {User} from "../../model/entities/User";
import {bounceIfCollides, updateCoords, updateSpeedForce} from "./EngineUtils";
import {UserPhysics} from "./objects/UserPhysics";
import {WorldObject} from "./objects/WorldObject";

export const TILE_SIZE = 100;

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
            bounceIfCollides(user.physics);
        });
    }

    private addBody(physics: WorldObject) {
        this.collisions.insert(physics.getBody());
    }

    private initWorld() {
        this.mapRep.getWorld().forEach((line: WorldTile[]) => {
            line.forEach((tile: WorldTile) => {
                const tilePhysics = new StonePhysics(tile.globalX, tile.globalY);
                tile.setBody(tilePhysics.body);
                this.collisions.insert(tilePhysics.body);
            });
        })
    }

}