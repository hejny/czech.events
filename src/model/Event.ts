import { ConfigChecker, IConfigSource } from 'configchecker';
import { enumToArray } from '../utils/enumToArray';

export enum EventType {
    CONFERENCE = 'CONFERENCE',
    MEETUP = 'MEETUP',
    WORKSHOP = 'WORKSHOP',
    HACKATHON = 'HACKATHON',
}

export enum EventPriceCurrency {
    CZK,
    EUR,
}

// TODO: Maybe better name because it colides with native browser Event class
export class Event {
    //TODO: readonly id: number;
    public name: string;
    public topic?: string;
    public city?: string;
    public year?: number;
    public month?: number;
    public day?: number;
    public days?: string;
    public date?: Date;
    public time?: string;
    public priceAmount?: number;
    public priceCurrency?: EventPriceCurrency;
    public codeName?: string;
    public codePercent?: number;
    public type: EventType;
    public web: URL;
    public inMail: boolean;
    public topParagraph?: string;
    public topParagraphOrder: number;

    constructor(data: IConfigSource) {
        const c = ConfigChecker.from(data);

        this.name = c.get('name').required().value;
        this.topic = c.get('topic').value;
        this.city = c.get('city').value;
        this.year = c.get('year').number().value;
        this.month = c.get('month').number().value;
        this.days = c.get('days').value;
        if (this.days) {
            this.day = parseInt(this.days.split('-')[0].trim());
        }

        if (this.day && isNaN(this.day)) {
            throw new Error(`Day parsed from "${this.days}" is NaN.`);
        }

        if (this.year && this.month && this.day) {
            try {
                this.date = new Date(this.year, this.month - 1, this.day);
                if (isNaN(this.date.getDate())) throw new Error();
            } catch {
                throw new Error(`Cannot create a valie new Date(${this.year}, ${this.month} - 1, ${this.day});`);
            }
        }

        this.time = c.get('time').value;
        this.priceAmount = c.get('priceAmount').number().value; //.required()
        // TODO: Configchecker should take number 0 as defined

        this.priceCurrency = (c.get('priceCurrency').value as unknown) as EventPriceCurrency;
        this.codeName = c.get('codeName').value;
        this.codePercent = c.get('codePercent').number().value;

        // TODO: Better
        if (this.codePercent) this.codePercent = this.codePercent / 100;

        this.type = c
            .get('type')
            .required()
            .asType<EventType>().value;
        // TODO: Configchecker native in asType
        // TODO: Typescript Enum in Configchecker
        if (!enumToArray(EventType).includes((this.type as unknown) as string)) {
            throw new Error(`Wrong type "${this.type}".`);
        }
        this.web = c
            .get('web')
            .url()
            .required().value;
        this.inMail = c
            .get('inMail')
            .boolean()
            .required().value;

        this.topParagraph = c.get('topParagraph').value;

        this.topParagraphOrder = c
            .get('topParagraphOrder')
            .number()
            .default(999).value!;

        //throw new Error(`Error test`);
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
