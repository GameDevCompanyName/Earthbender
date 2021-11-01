import * as express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import {GameServer} from "./GameServer";
import {generateWorld} from "./generation/WorldGenerator";

const app = express();
const http = createServer(app);
const io: Server = new Server(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/tempClient/index.html');
});
app.get('/world', (req, res) => {
    res.sendFile(__dirname + '/tempClient/world.html');
});
app.get('/newWorld', (req, res) => {
    res.send(generateWorld());
});
app.use(express.static(__dirname + '/tempClient'));

new GameServer(io);

http.listen(3000);