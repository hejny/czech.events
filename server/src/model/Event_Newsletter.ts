
import { AbstractModel } from './AbstractModel';

export class Season extends AbstractModel {
    constructor(data: Partial<Season>) {
        super();
        Object.assign(this, data);
    }

    static tableName = 'Event_Newsletter';
    static idColumn = 'id';

    public readonly id: number;
    public event_id: number;
    public newsletter_id: number;
    public status: 'VISIBLE'|'HIDDEN';
    public note: string|null;
    
}
