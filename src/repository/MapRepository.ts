import {WorldTile} from "../../model/entities/WorldTile";
import {UserPhysics} from "../world/objects/UserPhysics";
import {User} from "../../model/entities/User";
import {Environment} from "../../model/messages/Environment";

export interface MapRepository {
    getWorld(): WorldTile[][];
    updateUserTile(user: User);
    getPlayerPhysics(user: User): UserPhysics;
    getEnvironment(user: User): Environment
}