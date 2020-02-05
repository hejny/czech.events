
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
    year	year(4)	
    month	int(11)	
    note	text NULL
    
}
