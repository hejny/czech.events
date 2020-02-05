
import { AbstractModel } from './AbstractModel';

export class Season extends AbstractModel {
    constructor(season: Partial<Season>) {
        super();
        Object.assign(this, season);
    }

    static tableName = SQL_CONFIG.SEASONS.TABLE;
    static idColumn = 'Year';

    readonly Year: string;
    CountStart: Date;
    CountEnd: Date;
    SendUntil?: Date;
    Locked?: Date;
    SoftLimit?: number;
    HardLimit?: number;
    Current?: number; //TODO: boolean

    // Not database one
    UnknownSoftLimit?: number;
    UnknownHardLimit?: number;
}
