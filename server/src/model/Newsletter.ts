
import { AbstractModel } from './AbstractModel';

export class Season extends AbstractModel {
    constructor(data: Partial<Season>) {
        super();
        Object.assign(this, data);
    }

    static tableName = 'xxxxxxx';
    static idColumn = 'id';

    public readonly id: number;
    public year: number;
    public month: number;
    public note: string|null;
    
}
