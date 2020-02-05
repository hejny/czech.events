
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
    type	enum('DISCOUNT_PERCENT')	
    code	varchar(200)	
    value	float(10,2)	Here are the percents. Please write them in 0-1 interval, for example, 25% has value 0.25 here.
    note	text NULL
    
}
