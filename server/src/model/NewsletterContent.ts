import { AbstractModel } from './AbstractModel';

export class Season extends AbstractModel {
    constructor(data: Partial<Season>) {
        super();
        Object.assign(this, data);
    }

    static tableName = 'NewsletterContent';
    static idColumn = 'id';

    public readonly id: number;
    public newsletter_id: number;
    public position:
        | 'SUBJECT'
        | 'HEAD'
        | 'HEAD_CONFERENCES'
        | 'HEAD_MEETUPS'
        | 'HEAD_WORKSHOPS'
        | 'HEAD_HACKATHONS'
        | 'BOTTOM'; //TODO: DRY
    public order: number | null;
    public html: string;
    public note: string | null;
}
