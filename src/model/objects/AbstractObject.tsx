import uuid from 'uuid';
import { Transformation } from 'touchcontroller';
import { Vector2 } from 'touchcontroller';

// TODO: refactoring: maybe better naming
export abstract class AbstractObject {
    uuid: string;

    constructor() {
        this.uuid = uuid.v4();
    }

    abstract render(): JSX.Element;
}
