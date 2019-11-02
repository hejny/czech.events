import { ConfigChecker, IConfigSource } from 'configchecker';
import { Url } from 'url';
import { enumToArray } from '../utils/enumToArray';

export enum EventType {
    MEETUP,
    CONFERENCE,
    WORKSHOP,
    HACKATHON,
}

export class Event {
    //TODO: readonly id: number;
    public name: string;
    public topic?: string;
    public city?: string;
    public year: number;
    public month: number;
    public days: string;
    public time?: string;
    public price?: string;
    public code?: string;
    public type: EventType;
    public web?: Url;
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
        this.time = c.get('time').value;
        this.price = c.get('price').value;
        this.code = c.get('code').value;
        this.type = c
            .get('type')
            .required()
            .asType<EventType>().value;
        // TODO: Configchecker native in asType
        if (!enumToArray(EventType).includes((this.type as unknown) as string)) {
            throw new Error(`Wrong type "${this.type}".`);
        }
        this.web = c.get('web').url().value;
        this.inMail = c
            .get('inMail')
            .boolean()
            .required().value;
    }

    /*static error(error: Error):Event{
        return new Event();
    }*/
}
