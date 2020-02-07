
import { AbstractModel } from './AbstractModel';

export class Season extends AbstractModel {
    constructor(data: Partial<Season>) {
        super();
        Object.assign(this, data);
    }

    static tableName = 'xxxxxxx';
    static idColumn = 'id';

    public readonly id: number;
    public event_id: number;
    public type: 'DISCOUNT_PERCENT';
    public code: string;
    public value: number;
    public note: string|null;
    
}
