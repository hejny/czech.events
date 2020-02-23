import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Newsletter } from './Newsletter';

@Index('newsletter_id', ['newsletterId'], {})
@Index('position', ['position'], {})
@Entity('NewsletterContent')
export class NewsletterContent {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'newsletter_id' })
    newsletterId: number;

    @Column('enum', {
        name: 'position',
        enum: ['SUBJECT', 'HEAD', 'HEAD_CONFERENCES', 'HEAD_MEETUPS', 'HEAD_WORKSHOPS', 'HEAD_HACKATHONS', 'BOTTOM'],
    })
    position:
        | 'SUBJECT'
        | 'HEAD'
        | 'HEAD_CONFERENCES'
        | 'HEAD_MEETUPS'
        | 'HEAD_WORKSHOPS'
        | 'HEAD_HACKATHONS'
        | 'BOTTOM';

    @Column('int', { name: 'order', nullable: true })
    order: number | null;

    @Column('text', { name: 'html' })
    html: string;

    @Column('text', { name: 'note', nullable: true })
    note: string | null;

    @ManyToOne(
        () => Newsletter,
        (newsletter) => newsletter.newsletterContents,
        { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
    )
    @JoinColumn([{ name: 'newsletter_id', referencedColumnName: 'id' }])
    newsletter: Newsletter;
}
