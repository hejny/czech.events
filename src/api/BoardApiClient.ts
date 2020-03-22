import SocketIO from 'socket.io-client';
//import { Observable } from 'rxjs';
import { forTime } from 'waitasecond';
import { Freehand } from '../model/objects/Freehand';
import { Vector2 } from 'touchcontroller';
import { BoardState } from '../model/BoardState';
import { observe } from 'mobx';
import { ObjectPool } from '../utils/ObjectPool';
import { idstring } from '../utils/idstring';

// TODO: Maybe this should be named driver
export class BoardApiClient {
    private socket;

    constructor(private apiUrl: string, private boardUuid: idstring, private boardState: BoardState) {
        this.establishConnection();
        this.syncObjects();
    }

    private establishConnection() {
        this.socket = SocketIO(this.apiUrl);
    }

    private async syncObjects() {
        /*observe(this.boardState.objects, (change: any) => {
            if (change.type === 'splice') {
                console.log('change', change.added);

                const object = change.added[0];

                observe(object, (change: any) => {
                    console.log('change', change);
                });
            }
        });*/

        const objectPool = new ObjectPool();

        observe(this.boardState, () => {
            const changed = objectPool.registerNewVersions(this.boardState.objects);
            this.socket.emit('objects', changed);
        });

        /*this.socket.on('object', (data: Message) => {
            this.boardState.objects.push(object);
        });*/

        while (true) {
            await forTime(60 * 1000); // TODO: forTimeSynced

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
