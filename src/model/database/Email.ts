import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmailAttempt } from './EmailAttempt';

@Index('Flag', ['flag'], {})
@Index('Created', ['created'], {})
@Index('To', ['to'], {})
@Index('From', ['from'], {})
@Index('Subject', ['subject'], {})
@Entity('Email', { schema: 'czechevents' })
export class Email {
    @PrimaryGeneratedColumn({ type: 'int', name: 'Id' })
    id: number;

    @Column('varchar', { name: 'To', length: 255 })
    to: string;

    @Column('varchar', { name: 'From', length: 255 })
    from: string;

    @Column('varchar', { name: 'Subject', length: 255 })
    subject: string;

    @Column('longtext', { name: 'Body' })
    body: string;

    @Column('datetime', { name: 'Created' })
    created: Date;

    @Column('varchar', { name: 'Flag', nullable: true, length: 200 })
    flag: string | null;

    @Column('text', { name: 'Note', nullable: true })
    note: string | null;

    @OneToMany(
        () => EmailAttempt,
        (emailAttempt) => emailAttempt.email,
    )
    emailAttempts: EmailAttempt[];
}
