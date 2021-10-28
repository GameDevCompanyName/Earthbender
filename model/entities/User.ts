import {UserId} from "./UserId";
import {UserControls} from "./UserControls";
import {UserPhysics} from "../../src/world/objects/UserPhysics";
import {NULL_VECTOR} from "../../src/world/EngineUtils";

export class User {
    name: string;
    id: UserId;
    physics: UserPhysics;
    controls: UserControls;


    constructor(name: string, id: UserId) {
        this.name = name;
        this.id = id;
        this.controls = new UserControls(0, 0);
    }
}