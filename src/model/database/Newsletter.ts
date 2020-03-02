import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Email } from './Email';
import { EventNewsletter } from './EventNewsletter';
import { NewsletterContent } from './NewsletterContent';

@Index('uuid', ['uuid'], { unique: true })
@Index('month', ['send'], {})
@Entity('Newsletter', {})
export class Newsletter {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('char', { name: 'uuid', nullable: true, unique: true, length: 36 })
    uuid: string | null;

    @Column('varchar', { name: 'name', nullable: true, length: 200 })
    name: string | null;

    @Column('varchar', { name: 'from', length: 1000 })
    from: string;

    @Column('datetime', { name: 'send', default: () => 'CURRENT_TIMESTAMP' })
    send: Date;

    @Column('text', { name: 'note', nullable: true })
    note: string | null;

    @OneToMany(
        () => Email,
        (email) => email.newsletter,
    )
    emails: Email[];

    @OneToMany(
        () => EventNewsletter,
        (eventNewsletter) => eventNewsletter.newsletter,
    )
    eventNewsletters: EventNewsletter[];

    @OneToMany(
        () => NewsletterContent,
        (newsletterContent) => newsletterContent.newsletter,
        { eager: true },
    )
    newsletterContents: NewsletterContent[];
}
