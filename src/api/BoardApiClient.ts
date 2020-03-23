import SocketIO from 'socket.io-client';
import { observe } from 'mobx';
import { idstring } from '../utils/idstring';
import { objectSerializer } from '../model/objects/10-objectSerializer';
import { ObjectVersionSystem } from './ObjectVersionSystem/ObjectVersionSystem';

// TODO: Maybe this should be named driver
export class BoardApiClient {
    private socket;

    constructor(private apiUrl: string, private boardUuid: idstring, private objectVersionSystem: ObjectVersionSystem) {
        this.establishConnection();
        this.syncObjects();
    }

    private establishConnection() {
        this.socket = SocketIO(this.apiUrl);
    }

    private async syncObjects() {
        //const objectPool = new ObjectPool();

        /*
        observe(this.objectVersionSystem, () => {
            const changed = objectPool.registerNewVersions(this.objectVersionSystem.objects);
            this.socket.emit('objects', changed.map(objectSerializer.serialize, objectSerializer));
        });
        */

        this.objectVersionSystem.commits.subscribe((commit) => {
            this.socket.emit('commit', objectSerializer.serialize(commit));
        });

        this.socket.on('commit', (newCommitData) => {
            //console.log('new objects from server');

            //console.log('data', data);
            //this.objectVersionSystem.objects.push(object);

            const newCommit = objectSerializer.deserialize(newCommitData);
            this.objectVersionSystem.pushCommit(newCommit);

            /*
            const oldObjectIndex = this.objectVersionSystem.objects.findIndex(
                (oldObject) => oldObject.uuid === newObject.uuid,
            );

            //console.log(oldObjectIndex);

            if (oldObjectIndex === -1) {
                this.objectVersionSystem.objects.push(newObject);
            } else {
                this.objectVersionSystem.objects[oldObjectIndex] = newObject;
            }*/
        });
    }
}
