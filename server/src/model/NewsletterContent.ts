
import { AbstractModel } from './AbstractModel';

export class Season extends AbstractModel {
    constructor(data: Partial<Season>) {
        super();
        Object.assign(this, data);
    }

    static tableName = 'xxxxxxx';
    static idColumn = 'id';

    readonly id: number;


    Sloupec	Typ	Komentář
    id	int(11) Auto Increment	
    newsletter_id	int(11)	
    position	enum('SUBJECT','HEAD','HEAD_CONFERENCES','HEAD_MEETUPS','HEAD_WORKSHOPS','HEAD_HACKATHONS','BOTTOM')	
    order	int(11) NULL	
    html	text	
    note	text NULL

    
}
