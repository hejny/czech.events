import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EventSource')
export class EventSource {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'url', length: 1000, unique: true })
    url: string;

    @Column('text', { name: 'note', nullable: true })
    note: string | null;
}
