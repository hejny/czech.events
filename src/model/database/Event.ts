import { AbstractModel } from './AbstractModel';

// TODO: Maybe better name because it colides with native browser Event class
export class Event extends AbstractModel {
    static tableName = 'Event';
    static idColumn = 'id';

    public readonly id: number;
    public serializeId: string;
    public name: string;
    public topic: string | null;
    public type: 'CONFERENCE' | 'MEETUP' | 'WORKSHOP' | 'HACKATHON'; //TODO: DRY
    public web: string | null; // TODO: like Date values URL values
    public city: string | null;
    public year: number | null;
    public month: number | null;
    public days: string | null;
    public time: string | null;
    public price: number | null;
    public priceCurrency: 'CZK' | 'EUR' | null; //TODO: DRY
    public visibility: 'PENDING' | 'VISIBLE' | 'HIDDEN' | 'FEATURED'; //TODO: DRY
    public note: string | null;

    constructor(data: Partial<Event>) {
        super();
        Object.assign(this, data);
    }

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
