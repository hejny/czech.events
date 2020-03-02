import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Newsletter } from './Newsletter';
import { Event } from './Event';

export enum NewsletterContentPosition {
    SUBJECT = 'SUBJECT',
    HEAD = 'HEAD',
    HEAD_CONFERENCES = 'HEAD_CONFERENCES',
    HEAD_MEETUPS = 'HEAD_MEETUPS',
    HEAD_WORKSHOPS = 'HEAD_WORKSHOPS',
    HEAD_HACKATHONS = 'HEAD_HACKATHONS',
    BOTTOM = 'BOTTOM',
}

@Index('uuid', ['uuid'], { unique: true })
@Index('newsletter_id', ['newsletterId'], {})
@Index('position', ['position'], {})
@Index('event_id', ['eventId'], {})
@Entity('NewsletterContent', {})
export class NewsletterContent {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('char', { name: 'uuid', nullable: true, unique: true, length: 36 })
    uuid: string | null;

    @Column('int', { name: 'newsletter_id', nullable: true })
    newsletterId: number | null;

    @Column('int', { name: 'event_id', nullable: true })
    eventId: number | null;

    @Column('enum', {
        name: 'position',
        enum: NewsletterContentPosition,
    })
    position: NewsletterContentPosition;

    @Column('int', { name: 'order', nullable: true })
    order: number | null;

    @Column('text', { name: 'html' })
    html: string;

    @Column('text', { name: 'note', nullable: true })
    note: string | null;

    @ManyToOne(
        () => Newsletter,
        (newsletter) => newsletter.newsletterContents,
        { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
    )
    @JoinColumn([{ name: 'newsletter_id', referencedColumnName: 'id' }])
    newsletter: Newsletter;

    @ManyToOne(
        () => Event,
        (event) => event.newsletterContents,
        { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
    )
    @JoinColumn([{ name: 'event_id', referencedColumnName: 'id' }])
    event: Event;
}
