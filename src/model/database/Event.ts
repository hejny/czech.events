import { NewsletterContent } from './NewsletterContent';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventCode } from './EventCode';

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
@Index('type', ['type'], {})
@Index('city', ['city'], {})
@Index('year', ['year'], {})
@Index('month', ['month'], {})
@Index('time', ['time'], {})
@Index('price', ['price'], {})
@Index('priceCurrency', ['priceCurrency'], {})
@Index('visibility', ['visibility'], {})
@Index('created', ['created'], {})
@Index('updated', ['updated'], {})
@Index('canceled', ['canceled'], {})
@Index('online', ['online'], {})
@Entity('Event')
export class Event {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'serializeId', unique: true, length: 1000 }) // TODO: This should be named just URL
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

    @Column('tinyint', { name: 'canceled', nullable: true })
    canceled: number | null;

    @Column('tinyint', { name: 'online', nullable: true })
    online: number | null;

    @Column('text', { name: 'note', nullable: true })
    note: string | null;

    @Column('timestamp', { name: 'created', default: () => 'CURRENT_TIMESTAMP' })
    created: Date;

    @Column('timestamp', { name: 'updated', default: () => 'CURRENT_TIMESTAMP' })
    updated: Date;

    @OneToMany(
        () => EventCode,
        (eventCode) => eventCode.event,
        { eager: true },
    )
    eventCodes: EventCode[];

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
