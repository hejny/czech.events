import uuid from 'uuid';
import { idstring } from '../../utils/idstring';

// TODO: refactoring: maybe better naming
export abstract class AbstractObject {
    uuid: idstring;
    version: idstring;

    constructor() {
        this.uuid = uuid.v4();
    }

    public updateTick() {
        // TODO: optimize
        this.version = uuid.v4();
    }

    public abstract render(): JSX.Element;
}
