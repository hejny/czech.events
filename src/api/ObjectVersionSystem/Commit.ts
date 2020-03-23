import { idstring } from '../../utils/idstring';
import { AbstractObject } from '../../model/objects/AbstractObject';
import uuid from 'uuid';

export class Commit {
    // TODO: Maybe chainId: idstring;
    public commitId: idstring;
    public previousId: idstring | null;

    public previousVersion: 'KEEP' | 'REPLACE';

    // TODO: Maybe date: Date;

    // TODO: better name
    // TODO: better then string
    public owners: string[] = [];

    constructor(public data: AbstractObject | null /* TODO: This should maybe be generic data: TData;*/) {}

    public static newCommit(data: AbstractObject | null): Commit {
        const newCommit = new Commit(data);
        newCommit.commitId = uuid.v4();
        newCommit.previousId = null;
        return newCommit;
    }

    public nextCommit(data: AbstractObject | null, previousVersion: 'KEEP' | 'REPLACE'): Commit {
        const nextCommit = new Commit(data);
        nextCommit.commitId = uuid.v4();
        nextCommit.previousId = this.commitId;
        return nextCommit;
    }
}
