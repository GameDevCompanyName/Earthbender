import {SessionRepository} from "../../SessionRepository";
import {User} from "../../../entities/User";

export class SessionMapRepository implements SessionRepository {

    private readonly sessions: Map<string, User>

    createSession(socketId: string, user: User) {
        this.sessions.set(socketId, user);
    }

    isLoggedIn(socketId: string): boolean {
        return this.sessions.has(socketId);
    }

    getSession(socketId: string): User {
        const session: User = this.sessions.get(socketId);
        if (!session) {
            throw new Error(`Found no sessions for ${socketId}`);
        }
        return session;
    }

}