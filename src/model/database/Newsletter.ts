import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventNewsletter } from './EventNewsletter';
import { NewsletterContent } from './NewsletterContent';

@Index('year', ['year'], {})
@Index('month', ['month'], {})
@Entity('Newsletter')
export class Newsletter {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('year', { name: 'year' })
    year: number;

    @Column('int', { name: 'month' })
    month: number;

    @Column('text', { name: 'note', nullable: true })
    note: string | null;

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
