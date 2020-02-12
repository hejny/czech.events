import { AbstractModel } from './AbstractModel';

export class Subscriber extends AbstractModel {
    constructor(data: Partial<Subscriber>) {
        super();
        Object.assign(this, data);
    }

    static tableName = 'Subscriber';
    static idColumn = 'id';
    static dateFields = ['created'];

    public readonly id: number;
    public email: string;
    public fullname: string | null;
    public source: string | null;
    public created: Date | null;
    public active: number;
}
