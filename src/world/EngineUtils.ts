import {Vector, AbstractVector} from 'vector2d';
import {UserControls} from "../../model/entities/UserControls";
import {UserPhysics} from "./objects/UserPhysics";
import {WorldObject} from "./objects/WorldObject";
import {Body, Collisions} from 'detect-collisions';

export const MAX_SPEED = 50;
export const BASE_PLAYER_FORCE: number = 1.5;
export const BASE_BREAK_FORCE: number = 1.05;
export const FULL_STOP_THRESHOLD: number = 0.1;
export const BOUNCE_MODIFIER: number = -0.4;
export const NULL_VECTOR = new Vector(0, 0);

export function updateSpeedForce(controls: UserControls, physics: UserPhysics) {
    // Трение
    var speed = physics.getSpeed();
    speed = speed.divideByScalar(BASE_BREAK_FORCE);
    if (speed.length() < FULL_STOP_THRESHOLD) {
        speed = NULL_VECTOR.clone();
    }

    const forceVector = controls.getForceVector();
    if (forceVector.length() > 0) {
        // Направление силы * мощность двигателя игрока
        physics.setForce(forceVector.normalize().multiplyByScalar(BASE_PLAYER_FORCE));
    } else {
        physics.setForce(NULL_VECTOR);
    }

    // Применяем силу к скорости
    speed.add(physics.getForce());

    // Вычисляем новую скорость
    physics.setSpeed(speed);
}

export function updateCoords(object: WorldObject) {
    applyVector(object.getBody(), object.getSpeed());
};

export function bounceIfCollides(object: WorldObject, system: Collisions) {
    const body = object.getBody();
    const speed = object.getSpeed();
    if (collides(body, system)) {
        object.setForce(NULL_VECTOR.clone());
        applyVector(body, speed.clone().reverse());
        object.setSpeed( speed.multiplyByScalar(BOUNCE_MODIFIER) );
    }
}

export function collides(body: Body, system: Collisions): boolean {
    const collidingBody = system.potentials(body).find(other => body.collides(other));
    return !!collidingBody;
}

function applyVector(body: Body, vector: AbstractVector) {
    body.x = body.x + vector.x;
    body.y = body.y + vector.y;
}
