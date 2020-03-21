import SocketIO from 'socket.io-client';
import { AbstractObject } from '../model/objects/AbstractObject';
import { Observable } from 'rxjs';
import { forTime } from 'waitasecond';
import { Freehand } from '../model/objects/Freehand';
import { Vector2 } from 'touchcontroller';

export class BoardApiClient {
    private socket;

    constructor(private apiUrl: string, boardUuid: string) {
        this.establishConnection();
    }

    private establishConnection() {
        this.socket = SocketIO(this.apiUrl);
    }

    public objects(): Observable<AbstractObject> {
        return new Observable<AbstractObject>((observer) => {
            (async () => {
                while (true) {
                    await forTime(500);
                    observer.next(
                        new Freehand(
                            Array(25).map(() => new Vector2(Math.random() * 500, Math.random() * 500)),
                            'red',
                            2,
                        ),
                    );
                }
            })();
        });
        //this.socket.on('message', (data: Message) => observer.next(data));
    }
}
