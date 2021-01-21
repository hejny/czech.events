import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

@Index('position', ['position'], {})
@Entity('NewsletterContent')
export class NewsletterContent {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'event_id', nullable: true, comment: 'Is the paragraph connected to some one event?' })
    eventId: number;

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
        () => Event,
        (event) => event.newsletterContents,
        { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
    )
    @JoinColumn([{ name: 'event_id', referencedColumnName: 'id' }])
    event: Event;
}
