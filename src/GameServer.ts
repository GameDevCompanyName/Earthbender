import { Server, Socket } from 'socket.io';
import {UserRepository} from "./repository/UserRepository";
// import {UserMapRepository} from "./repository/imp/map/UserMapRepository";
import {MapRepository} from "./repository/MapRepository";
import {MapMapRepository} from "./repository/imp/map/MapMapRepository";
import {SessionRepository} from "./repository/SessionRepository";
import {SessionMapRepository} from "./repository/imp/map/SessionMapRepository";
import {World} from "./world/World";
import {User} from "../model/entities/User";
import {UserId} from "../model/entities/UserId";
import { inspect } from 'util';
import {NULL_VECTOR} from "./world/EngineUtils";
import {UserControls} from "../model/entities/UserControls";

const TIMEOUT = 1000 / 30;
const RESTRICTED_FIELDS = ['_bvh'];

export class GameServer {

    // readonly users: UserRepository = new UserMapRepository();
    readonly mapRep: MapRepository = new MapMapRepository();
    readonly sessions: SessionRepository = new SessionMapRepository();
    readonly world: World = new World(this.mapRep);
    readonly io: Server;

    constructor(io: Server) {
        this.io = io;

        io.on('connection', (socket: Socket) => {
            let userId: string = 'user-' + socket.id;
            const newUser: User = new User(userId, new UserId(userId));
            newUser.physics = this.mapRep.getPlayerPhysics(newUser);
            this.world.addUser(newUser);

            console.log('user connected');

            this.sessions.createSession(socket, newUser);
            socket.on('disconnect', () => {
                console.log('user disconnected');
                this.sessions.deleteSession(socket);
                // remove from world
            });

            socket.on('controls', data => {
                this.sessions.getSession(socket).controls = new UserControls(data.x, data.y);
            });

            this.sendEnv(socket, newUser);
        });

        this.update();
    }

    sendEnv(socket: Socket, user: User) {
        const env = this.mapRep.getEnvironment(user);
        socket.emit('env', stringify(env));
    }

    update() {
        this.world.tick(this.sessions.getConectedUsers());
        this.sessions.getConnections().forEach(socket => {
            this.sendEnv(socket, this.sessions.getSession(socket));
        });
        setTimeout(() => this.update(), TIMEOUT);
    }

}

export function stringify(obj: any) {
    return JSON.stringify(obj, (key: string, value: any) => {
        if (RESTRICTED_FIELDS.some(prefix => key.indexOf(prefix) > -1)) {
            return null;
        }
        return value;
    })
}