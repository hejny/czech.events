import { AbstractModel } from './AbstractModel';

export class Season extends AbstractModel {
    constructor(data: Partial<Season>) {
        super();
        Object.assign(this, data);
    }

    static tableName = 'EventCode';
    static idColumn = 'id';

    public readonly id: number;
    public event_id: number;
    public type: 'DISCOUNT_PERCENT'; //TODO: DRY
    public code: string;
    public value: number;
    public note: string | null;
}
