import {UserId} from "./UserId";
import {UserControls} from "./UserControls";
import {UserPhysics} from "../../src/world/objects/UserPhysics";

export interface User {
    name: string;
    id: UserId;
    physics: UserPhysics;
    controls: UserControls;
}