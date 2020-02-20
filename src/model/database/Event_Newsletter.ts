import { AbstractModel } from './AbstractModel';

export class Event_Newsletter extends AbstractModel {
    constructor(data: Partial<Event_Newsletter>) {
        super();
        Object.assign(this, data);
    }

    static tableName = 'Event_Newsletter';
    static idColumn = 'id';

    public readonly id: number;
    public event_id: number;
    public newsletter_id: number;
    public status: 'VISIBLE' | 'HIDDEN';
    public note: string | null;
}
