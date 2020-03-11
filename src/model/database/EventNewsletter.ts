import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './Event';
import { Newsletter } from './Newsletter';

// TODO: All enums to real TS enums
@Index('event_id', ['event_id'], {})
@Index('newsletter_id', ['newsletter_id'], {})
@Index('status', ['status'], {})
@Entity('Event_Newsletter', {})
export class EventNewsletter {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'event_id' })
    event_id: number;

    @Column('int', { name: 'newsletter_id' })
    newsletter_id: number;

    @Column('enum', { name: 'status', enum: ['VISIBLE', 'HIDDEN'] })
    status: 'VISIBLE' | 'HIDDEN';

    @Column('text', { name: 'note', nullable: true })
    note: string | null;

    @ManyToOne(
        () => Event,
        (event) => event.eventNewsletters,
        { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
    )
    @JoinColumn([{ name: 'event_id', referencedColumnName: 'id' }])
    event: Event;

    @ManyToOne(
        () => Newsletter,
        (newsletter) => newsletter.eventNewsletters,
        { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
    )
    @JoinColumn([{ name: 'newsletter_id', referencedColumnName: 'id' }])
    newsletter: Newsletter;
}