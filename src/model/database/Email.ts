import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Newsletter } from './Newsletter';
import { EmailAttempt } from './EmailAttempt';

@Index('Flag', ['flag'], {})
@Index('Created', ['created'], {})
@Index('To', ['to'], {})
@Index('From', ['from'], {})
@Index('Subject', ['subject'], {})
@Index('newsletter_id', ['newsletter_id'], {})
@Entity('Email', {})
export class Email {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('char', { name: 'uuid', nullable: true, length: 36 })
    uuid: string | null;

    @Column('int', { name: 'newsletter_id', nullable: true })
    newsletter_id: number | null;

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

    @Column('datetime', { name: 'send', default: () => 'CURRENT_TIMESTAMP' })
    send: Date;

    @Column('varchar', { name: 'flag', nullable: true, length: 200 })
    flag: string | null;

    @Column('text', { name: 'note', nullable: true })
    note: string | null;

    @ManyToOne(
        () => Newsletter,
        (newsletter) => newsletter.emails,
        { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
    )
    @JoinColumn([{ name: 'newsletter_id', referencedColumnName: 'id' }])
    newsletter: Newsletter;

    @OneToMany(
        () => EmailAttempt,
        (emailAttempt) => emailAttempt.email,
    )
    emailAttempts: EmailAttempt[];
}
