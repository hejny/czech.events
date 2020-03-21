import uuid from 'uuid';

// TODO: refactoring: maybe better naming
export abstract class CollBoardObject {
    uuid: string;

    constructor() {
        this.uuid = uuid.v4();
    }

    abstract render(): JSX.Element;
}
