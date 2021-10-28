import {User} from "../../model/entities/User";

export interface UserRepository {
    userExists(name: string): boolean;
    createUser(name: string, salt: string): User;
    getUser(name: string, salt: string): User;
}