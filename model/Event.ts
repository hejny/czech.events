import { ConfigChecker, IConfigSource } from 'configchecker';
import { Url, parse } from 'url';
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

export class Event {
    //TODO: readonly id: number;
    public name: string;
    public topic?: string;
    public city?: string;
    public year: number;
    public month: number;
    public day: number;
    public days: string;
    public date: Date;
    public time?: string;
    public priceAmount?: number;
    public priceCurrency?: EventPriceCurrency;
    public codeName?: string;
    public codePercent?: number;
    public type: EventType;
    public web: Url;
    public inMail: boolean;

    constructor(data: IConfigSource) {
        const c = ConfigChecker.from(data);

        this.name = c.get('name').required().value;
        this.topic = c.get('topic').value;
        this.city = c.get('city').value;
        this.year = c
            .get('year')
            .number()
            .required().value;
        this.month = c
            .get('month')
            .number()
            .required().value;
        this.days = c.get('days').required().value;
        this.day = parseInt(this.days.split('-')[0].trim());

        if (isNaN(this.day)) {
            throw new Error(`Day parsed from "${this.days}" is NaN.`);
        }

        try {
            this.date = new Date(this.year, this.month - 1, this.day);
            if (isNaN(this.date.getDate())) throw new Error();
        } catch {
            throw new Error(`Cannot create a valie new Date(${this.year}, ${this.month} - 1, ${this.day});`);
        }

        this.time = c.get('time').required().value;
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

        //throw new Error(`Error test`);
    }

    /*static error(error: Error):Event{
        return new Event();
    }*/
}
