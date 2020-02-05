
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
    serializeId	varchar(1000)	
    name	varchar(300)	
    topic	varchar(500) NULL	
    type	enum('CONFERENCE','MEETUP','WORKSHOP','HACKATHON')	
    web	varchar(1000) NULL	
    city	varchar(200) NULL	
    year	year(4) NULL	
    month	int(11) NULL	
    days	varchar(5) NULL	
    time	varchar(8) NULL	TODO: Maybe this should be type time
    price	int(11) NULL	
    priceCurrency	enum('CZK','EUR') NULL	
    visibility	enum('PENDING','VISIBLE','HIDDEN','FEATURED') [PENDING]	
    note	text NULL

}
