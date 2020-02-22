import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// TODO: Maybe better name because it colides with native browser Event class
@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Column() public serializeId: string;
    @Column() public name: string;
    @Column() public topic: string | null;
    @Column() public type: 'CONFERENCE' | 'MEETUP' | 'WORKSHOP' | 'HACKATHON'; //TODO: DRY
    @Column() public web: string | null; // TODO: like Date values URL values
    @Column() public city: string | null;
    @Column() public year: number | null;
    @Column() public month: number | null;
    @Column() public days: string | null;
    @Column() public time: string | null;
    @Column() public price: number | null;
    @Column() public priceCurrency: 'CZK' | 'EUR' | null; //TODO: DRY
    @Column() public visibility: 'PENDING' | 'VISIBLE' | 'HIDDEN' | 'FEATURED'; //TODO: DRY
    @Column() public note: string | null;

    /*constructor(data: Partial<Event>) {
        super();
        Object.assign(this, data);
    }*/

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
