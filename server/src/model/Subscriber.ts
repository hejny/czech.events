
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
    email	varchar(1000)	
    fullname	varchar(1000) NULL	
    source	varchar(2000) NULL	
    created	timestamp NULL	
    active	smallint(6) NULL [1]	
    
}
