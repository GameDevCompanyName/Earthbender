import { Server, Socket } from 'socket.io';
import { IncomingMessage } from 'http';

const basicEvents: string[] = new Array<string>('connection', 'login', 'register');

function isValid(request: IncomingMessage): boolean {
    //TODO
    return true;
}

export class GameServer {

    constructor(io: Server) {
        //TODO server init

        // io.use((socket: Socket, next) => {
        //     if (isValid(socket.request)) {
        //         next();
        //     } else {
        //         next(new Error("invalid"));
        //     }
        // });
    }

    getPlayerData

}