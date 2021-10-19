import {User} from "../entities/User";

export interface SessionRepository {
    isLoggedIn(socketId: string): boolean;
    createSession(socketId: string, user: User);
    getSession(socketId: string): User;
}