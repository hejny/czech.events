import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('uuid', ['uuid'], { unique: true })
@Index('email', ['email'], {})
@Index('created', ['created'], {})
@Index('active', ['active'], {})
@Entity('Subscriber', { schema: 'czechevents' })
export class Subscriber {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('char', { name: 'uuid', nullable: true, unique: true, length: 36 })
    uuid: string | null;

    @Column('varchar', { name: 'email', length: 1000 })
    email: string;

    @Column('varchar', { name: 'fullname', nullable: true, length: 1000 })
    fullname: string | null;

    @Column('varchar', { name: 'source', nullable: true, length: 2000 })
    source: string | null;

    @Column('timestamp', { name: 'created', nullable: true })
    created: Date | null;

    @Column('smallint', { name: 'active', nullable: true, default: () => "'1'" })
    active: number | null;
}
