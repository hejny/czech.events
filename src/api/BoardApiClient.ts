import SocketIO from 'socket.io-client';
//import { Observable } from 'rxjs';
//import { forTime } from 'waitasecond';
import { Freehand } from '../model/objects/Freehand';
import { Vector2 } from 'touchcontroller';
import { BoardState } from '../model/BoardState';
import { observe } from 'mobx';
import { ObjectPool } from './ObjectPool';
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

        this.socket.on('objects', (newObjectsData) => {
            //console.log('new objects from server');

            //console.log('data', data);
            //this.boardState.objects.push(object);

            // TODO: To some better function to propperly hydrate / dehydrate
            const newObjects = newObjectsData.map((objectData) => {
                const object = new Freehand(
                    objectData.points.map((pointData) => new Vector2(pointData.x, pointData.y)),
                    objectData.color,
                    objectData.weight,
                );

                object.uuid = objectData.uuid;
                object.updateTick();

                return object;
            });

            for (const newObject of newObjects) {
                const oldObjectIndex = this.boardState.objects.findIndex(
                    (oldObject) => oldObject.uuid === newObject.uuid,
                );

                //console.log(oldObjectIndex);

                if (oldObjectIndex === -1) {
                    this.boardState.objects.push(newObject);
                } else {
                    this.boardState.objects[oldObjectIndex] = newObject;
                }
            }
        });

        /*
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
        */
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
