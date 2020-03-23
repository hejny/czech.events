import { idstring } from '../../utils/idstring';
import { AbstractObject } from '../../model/objects/AbstractObject';

export class Commit {
    // TODO: Maybe chainId: idstring;
    commitId: idstring;
    previousId: idstring | null;

    previousVersion: 'KEEP' | 'REPLACE';

    date: Date;

    // TODO: better name
    // TODO: better then string
    owners: string[];

    // TODO: This should maybe be generic data: TData;
    data: AbstractObject | null;
}
