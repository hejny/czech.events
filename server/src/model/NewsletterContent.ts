
import { AbstractModel } from './AbstractModel';

export class Season extends AbstractModel {
    constructor(data: Partial<Season>) {
        super();
        Object.assign(this, data);
    }

    static tableName = 'xxxxxxx';
    static idColumn = 'id';

    public readonly id: number;
    public newsletter_id: number;
    public position	enum('SUBJECT','HEAD','HEAD_CONFERENCES','HEAD_MEETUPS','HEAD_WORKSHOPS','HEAD_HACKATHONS','BOTTOM')	
    public order: number|null;
    public html	text	
    public note: string|null;

    
}
