import {WorldObject} from "../../src/world/objects/WorldObject";
import {UserPhysics} from "../../src/world/objects/UserPhysics";

export class Environment {
    readonly objects: WorldObject[];
    readonly currentUser: UserPhysics;

    constructor(objects: WorldObject[], currentUser: UserPhysics) {
        this.objects = objects;
        this.currentUser = currentUser;
    }
}