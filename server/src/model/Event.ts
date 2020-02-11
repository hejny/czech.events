import { AbstractModel } from './AbstractModel';

export class Season extends AbstractModel {
    constructor(data: Partial<Season>) {
        super();
        Object.assign(this, data);
    }

    static tableName = 'Event';
    static idColumn = 'id';

    public readonly id: number;
    public serializeId: string;
    public name: string;
    public topic: string | null;
    public type: 'CONFERENCE' | 'MEETUP' | 'WORKSHOP' | 'HACKATHON'; //TODO: DRY
    public web: string | null;
    public city: string | null;
    public year: number | null;
    public month: number | null;
    public days: string | null;
    public time: string | null;
    public price: number | null;
    public priceCurrency: 'CZK' | 'EUR' | null; //TODO: DRY
    public visibility: 'PENDING' | 'VISIBLE' | 'HIDDEN' | 'FEATURED'; //TODO: DRY
    public note: string | null;
}
