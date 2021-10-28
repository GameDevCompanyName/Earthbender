import {SessionRepository} from "../../SessionRepository";
import {User} from "../../../../model/entities/User";
import {BiMap} from 'bim';
import {Socket} from 'socket.io';

export class SessionMapRepository implements SessionRepository {

    private readonly sessions: BiMap<Socket, User> = new BiMap<Socket, User>();

    createSession(socket: Socket, user: User) {
        this.sessions.set(socket, user);
    }

    deleteSession(socket: Socket) {
        this.sessions.delete(socket);
    }

    isLoggedIn(socket: Socket): boolean {
        return this.sessions.has(socket);
    }

    getSession(socket: Socket): User {
        const session: User = this.sessions.get(socket);
        if (!session) {
            throw new Error(`Found no sessions for ${socket.id}`);
        }
        return session;
    }

    getConectedUsers(): User[] {
        return [...this.sessions.values()];
    }

    getConnections(): Socket[] {
        return [...this.sessions.keys()];
    }

}