import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './Event';

@Index('uuid', ['uuid'], { unique: true })
@Index('event_id', ['eventId'], {})
@Index('type', ['type'], {})
@Index('value', ['value'], {})
@Entity('EventCode', {})
export class EventCode {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('char', { name: 'uuid', nullable: true, unique: true, length: 36 })
    uuid: string | null;

    @Column('int', { name: 'event_id' })
    eventId: number;

    @Column('enum', { name: 'type', enum: ['DISCOUNT_PERCENT'] })
    type: 'DISCOUNT_PERCENT';

    @Column('varchar', { name: 'code', length: 200 })
    code: string;

    @Column('float', { name: 'value', precision: 10, scale: 2 })
    value: number;

    @Column('text', { name: 'note', nullable: true })
    note: string | null;

    @ManyToOne(
        () => Event,
        (event) => event.eventCodes,
        { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
    )
    @JoinColumn([{ name: 'event_id', referencedColumnName: 'id' }])
    event: Event;
}
