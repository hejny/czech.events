import uuid from 'uuid';

export abstract class CollBoardObject {
    uuid: string;

    constructor() {
        this.uuid = uuid.v4();
    }

    abstract render(): JSX.Element;
}
