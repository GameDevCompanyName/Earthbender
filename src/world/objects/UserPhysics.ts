import {WorldObject, WorldObjectType} from "./WorldObject";
import {AbstractVector} from 'vector2d';
import {Polygon} from 'detect-collisions';
import {NULL_VECTOR} from "../EngineUtils";
import {UserId} from "../../../model/entities/UserId";

export class UserPhysics implements WorldObject {

    body: Polygon;
    speed: AbstractVector;
    force: AbstractVector;
    id: UserId;

    constructor(body: Polygon, id: UserId) {
        this.body = body;
        this.speed = NULL_VECTOR.clone();
        this.force = NULL_VECTOR.clone();
        this.id = id;
    }

    getBody(): Polygon {
        return this.body;
    }

    getType(): WorldObjectType {
        return WorldObjectType.USER;
    }

    isStatic(): boolean {
        return false;
    }

    getForce() {
        return (this.force || NULL_VECTOR).clone();
    }

    getSpeed() {
        return (this.speed || NULL_VECTOR).clone();
    }

    setSpeed(speed: AbstractVector) {
        this.speed = speed.clone();
    }

    setForce(force: AbstractVector) {
        this.force = force.clone();
    }

}