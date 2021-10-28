// import {UserRepository} from "../../UserRepository";
// import {User} from "../../../../model/entities/User";
//
// export class UserMapRepository implements UserRepository {
//
//     private readonly users: Map<string, UserRecord> = new Map<string, UserRecord>();
//
//     createUser(name: string, salt: string): User {
//         if (this.users.has(name)) {
//             throw new Error(`User ${name} already exists`);
//         }
//         const newUser: User = { name };
//         this.users.set(name, new UserRecord(newUser, salt));
//         return newUser;
//     }
//
//     getUser(name: string, salt: string): User {
//         const record: UserRecord = this.users.get(name);
//         if (!record) {
//             throw new Error('User does not exist');
//         }
//         if (record.salt !== salt) {
//             throw new Error(`Password for user ${name} does not match`);
//         }
//         return record.user;
//     }
//
//     userExists(name: string): boolean {
//         return this.users.has(name);
//     }
//
// }
//
// class UserRecord {
//     user: User;
//     salt: string;
//
//     constructor(user: User, salt: string) {
//         this.user = user;
//         this.salt = salt;
//     }
// }