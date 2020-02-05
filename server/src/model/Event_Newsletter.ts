
import { AbstractModel } from './AbstractModel';

export class Season extends AbstractModel {
    constructor(data: Partial<Season>) {
        super();
        Object.assign(this, data);
    }

    static tableName = 'xxxxxxx';
    static idColumn = 'id';

    readonly id: number;


    id	int(11) Auto Increment	
    event_id	int(11)	
    newsletter_id	int(11)	
    status	enum('VISIBLE','HIDDEN')	
    note
    
}
