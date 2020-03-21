import SocketIO from 'socket.io-client';
import { AbstractObject } from '../model/objects/AbstractObject';
//import { Observable } from 'rxjs';
import { forTime } from 'waitasecond';
import { Freehand } from '../model/objects/Freehand';
import { Vector2 } from 'touchcontroller';
import { BoardState } from '../model/BoardState';

// TODO: Maybe this should be named driver
export class BoardApiClient {
    private socket;

    constructor(private apiUrl: string, private boardUuid: string, private boardState: BoardState) {
        this.establishConnection();
        this.syncObjects();
    }

    private establishConnection() {
        this.socket = SocketIO(this.apiUrl);
    }

    private async syncObjects() {
        while (true) {
            await forTime(2000);

            const object = new Freehand(
                // TODO: Function for creation mocking objects
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(
                    () => new Vector2(Math.random() * 500, Math.random() * 500),
                ),
                'red',
                2,
            );

            console.log('object', object);
            this.boardState.objects.push(object);
        }
    }

    /*public get objects(): Observable<AbstractObject> {
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
    }*/
}
