import { Entity, PrimaryGeneratedColumn, Column, Index, Unique } from 'typeorm';

export enum EventType {
    CONFERENCE = 'CONFERENCE',
    MEETUP = 'MEETUP',
    WORKSHOP = 'WORKSHOP',
    HACKATHON = 'HACKATHON',
}

export enum EventPriceCurrency {
    CZK = 'CZK',
    EUR = 'EUR',
}

export enum EventVisibility {
    PENDING = 'PENDING',
    VISIBLE = 'VISIBLE',
    HIDDEN = 'HIDDEN',
    FEATURED = 'FEATURED',
}

// TODO: Maybe better name because it colides with native browser Event class
@Entity({ name: 'Event' /*TODO: DRY*/ })
@Index(['name', 'topic'], { unique: true })
export class Event {
    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Column({ nullable: false, length: 1000 })
    @Index({ unique: true })
    public serializeId: string;

    @Column({ nullable: false, length: 300 })
    public name: string;

    @Column({ nullable: true, length: 500 })
    public topic?: string;

    @Column({ nullable: false, type: 'enum', enum: EventType })
    @Index()
    public type: EventType;

    @Column({ nullable: true, length: 1000 })
    public web?: string;

    @Column({ nullable: true })
    @Index()
    public city?: string;

    @Column({ nullable: true, type: 'year' }) @Index() public year?: number;
    @Column({ nullable: true })
    @Index()
    public month?: number;

    @Column({ nullable: true, length: 5 })
    @Index()
    public days?: string;

    @Column({ nullable: true, length: 8, comment: 'TODO: Maybe this should be type time' })
    @Index()
    public time?: string;

    @Column({ nullable: true })
    @Index()
    public price?: number;

    @Column({ nullable: true, type: 'enum', enum: EventPriceCurrency })
    @Index()
    public priceCurrency?: EventPriceCurrency;

    @Column({ nullable: false, type: 'enum', enum: EventVisibility })
    @Index()
    public visibility: EventVisibility;

    @Column({ nullable: true, type: 'text', comment: 'Only a hidden note not visible for visitors of the web' })
    public note?: string;

    /*
    constructor(data: Partial<Event>) {
        //super();
        Object.assign(this, data);
    }
    */

    get day(): number | null {
        if (this.days) {
            return parseInt(this.days.split('-')[0].trim());
        } else {
            return null;
        }
    }

    get date(): Date | null {
        if (this.year && this.month && this.day) {
            const date = new Date(this.year, this.month - 1, this.day);

            if (!isNaN(date.getDate())) {
                return date;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    /**
     * Purpose of this method is to provide date only for comparing functions - so it can be wrong (for example can be shifted by a day) but roughly OK and everytime defined
     * compared to Event.date which is everytime precise but can be undefined
     * This getter is usefull when we have only a month and year of an event but not a precise day.
     */
    get dateToCompare(): Date {
        if (this.date) {
            return this.date;
        } else if (this.year && this.month) {
            const date = new Date(this.year, this.month - 1, 25 /*Some late day in the month*/);
            return date;
        } else {
            const date = new Date();
            date.setDate(date.getDate() + 1000 /*TODO: Some big constant*/);
            return date;
        }
    }

    /*static error(error: Error):Event{
        return new Event();
    }*/
}
