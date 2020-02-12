import { AbstractModel } from './AbstractModel';

export class Newsletter extends AbstractModel {
    constructor(data: Partial<Newsletter>) {
        super();
        Object.assign(this, data);
    }

    static tableName = 'Newsletter';
    static idColumn = 'id';

    public readonly id: number;
    public year: number;
    public month: number;
    public note: string | null;
}
