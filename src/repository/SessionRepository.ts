import {User} from "../../model/entities/User";
import {Socket} from 'socket.io';

export interface SessionRepository {
    isLoggedIn(socket: Socket): boolean;
    createSession(socket: Socket, user: User);
    deleteSession(socket: Socket);
    getSession(socket: Socket): User;
    getConectedUsers(): User[];
    getConnections(): Socket[];
}