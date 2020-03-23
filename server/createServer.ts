import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
const packageJson = require('../package.json');

export async function createServer(): Promise<http.Server> {
    const app = express();

    app.use(json());
    app.use(cors());

    const server = http.createServer(app);
    const socket = SocketIO(server);

    socket.on('connection', (connection) => {
        //connection.emit('test', {});
        connection.on('commit', (commit) => {
            console.log('commit', commit);

            commit.owners.push('remote');

            connection.broadcast.emit('commit', commit);
        });
    });

    app.use((err: any, req: any, res: any, next: any) => {
        console.error(err);
    });

    app.get(['/', '/about'], async (request, response) => {
        response.send({
            version: packageJson.version,
        });
    });

    return server;
}