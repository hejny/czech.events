import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmailAttempt } from './EmailAttempt';

@Index('Flag', ['flag'], {})
@Index('Created', ['created'], {})
@Index('To', ['to'], {})
@Index('From', ['from'], {})
@Index('Subject', ['subject'], {})
@Entity('Email')
export class Email {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'to', length: 255 })
    to: string;

    @Column('varchar', { name: 'from', length: 255 })
    from: string;

    @Column('varchar', { name: 'subject', length: 255 })
    subject: string;

    @Column('longtext', { name: 'body' })
    body: string;

    @Column('datetime', { name: 'created', default: () => 'CURRENT_TIMESTAMP' })
    created: Date;

    @Column('varchar', { name: 'flag', nullable: true, length: 200 })
    flag: string | null;

    @Column('text', { name: 'note', nullable: true })
    note: string | null;

    @OneToMany(
        () => EmailAttempt,
        (emailAttempt) => emailAttempt.email,
    )
    emailAttempts: EmailAttempt[];
}
