
import { AbstractModel } from './AbstractModel';

export class Season extends AbstractModel {
    constructor(data: Partial<Season>) {
        super();
        Object.assign(this, data);
    }

    static tableName = 'xxxxxxx';
    static idColumn = 'id';

    public readonly id: number;
    public serializeId: string;
    public name: string;
    public topic: string|null;
    public type: 'CONFERENCE'|'MEETUP','WORKSHOP','HACKATHON';
    public web: string|null;
    public city: string|null;	
    public year: number|null;
    public month: number|null;
    public days: string|null;
    public time: string|null;
    public price: number|null;
    public priceCurrency: 'CZK'|'EUR'|null;//TODO: DRY	
    public visibility	enum('PENDING','VISIBLE','HIDDEN','FEATURED') [PENDING]	
    public note: string|null;

}
