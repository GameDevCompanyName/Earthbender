import * as express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import {GameServer} from "./GameServer";

const app = express();
const http = createServer(app);
const io: Server = new Server(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'client/public/index.html');
});

new GameServer(io);

http.listen(3000);