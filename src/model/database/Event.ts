import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventCode } from './EventCode';
import { EventNewsletter } from './EventNewsletter';
import { NewsletterContent } from './NewsletterContent';
import moment from 'moment';
import 'moment/locale/cs';
import { icsDate } from '../../utils/icsDate';

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

@Index('serializeId', ['serializeId'], { unique: true })
@Index('name_topic', ['name', 'topic'], { unique: true })
@Index('uuid', ['uuid'], { unique: true })
@Index('type', ['type'], {})
@Index('city', ['city'], {})
@Index('year', ['year'], {})
@Index('month', ['month'], {})
@Index('time', ['time'], {})
@Index('price', ['price'], {})
@Index('priceCurrency', ['priceCurrency'], {})
@Index('visibility', ['visibility'], {})
@Entity('Event')
export class Event {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('char', { name: 'uuid', nullable: true, unique: true, length: 36 })
    uuid: string | null;

    @Column('varchar', { name: 'serializeId', unique: true, length: 1000 })
    serializeId: string;

    @Column('varchar', { name: 'name', length: 300 })
    name: string;

    @Column('varchar', { name: 'topic', nullable: true, length: 500 })
    topic: string | null;

    @Column('enum', {
        name: 'type',
        enum: EventType,
    })
    type: EventType;

    @Column('varchar', { name: 'web', nullable: true, length: 1000 })
    web: string | null;

    @Column('varchar', { name: 'city', nullable: true, length: 200 })
    city: string | null;

    @Column('year', { name: 'year', nullable: true })
    year: number | null;

    @Column('int', { name: 'month', nullable: true })
    month: number | null;

    @Column('varchar', { name: 'days', nullable: true, length: 5 })
    days: string | null;

    @Column('varchar', { name: 'time', nullable: true, length: 8 })
    time: string | null;

    @Column('int', { name: 'price', nullable: true })
    price: number | null;

    @Column('enum', {
        name: 'priceCurrency',
        nullable: true,
        enum: EventPriceCurrency,
    })
    priceCurrency: EventPriceCurrency | null;

    @Column('enum', {
        name: 'visibility',
        enum: EventVisibility,
        default: () => "'PENDING'",
    })
    visibility: EventVisibility;

    @Column('text', { name: 'note', nullable: true })
    note: string | null;

    @OneToMany(
        () => EventCode,
        (eventCode) => eventCode.event,
        { eager: true },
    )
    eventCodes: EventCode[];

    @OneToMany(
        () => EventNewsletter,
        (eventNewsletter) => eventNewsletter.event,
    )
    eventNewsletters: EventNewsletter[];

    @OneToMany(
        () => NewsletterContent,
        (newsletterContent) => newsletterContent.event,
        { eager: true },
    )
    newsletterContents: NewsletterContent[];

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
            // TODO: Maybe better?
            const time = moment(this.time || '00:00 AM', 'hh A').toDate();
            date.setHours(time.getHours());
            date.setMinutes(time.getMinutes());
            // TODO: Maybe seconds?

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

    get ics(): string | null {
        const { name, topic, date } = this;
        if (!date) {
            return null;
        }
        //TODO: escape
        const ics = `BEGIN:VEVENT
UID:${this.uuid}@collboard
DTSTAMP:${icsDate(date)}
DTSTART:${icsDate(date)}
DTEND:${icsDate(date)}
SUMMARY:${`${name.trim()}${topic ? ` – ${topic.trim()}` : ''}`}
CLASS:PUBLIC
END:VEVENT`;
        return ics;
    }

    /*static error(error: Error):Event{
  return new Event();
  }*/
}
