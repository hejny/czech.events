// @ts-nocheck 
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Email } from './Email';

@Index('EmailId', ['emailId'], {})
@Index('Success', ['success'], {})
@Index('Created', ['created'], {})
@Entity('EmailAttempt', { schema: 'czechevents' })
export class EmailAttempt {
    @PrimaryGeneratedColumn({ type: 'int', name: 'Id', unsigned: true })
    id: number;

    @Column('int', { name: 'EmailId' })
    emailId: number;

    @Column('tinyint', { name: 'Success' })
    success: number;

    @Column('text', { name: 'Message' })
    message: string;

    @Column('datetime', { name: 'Created', default: () => 'CURRENT_TIMESTAMP' })
    created: Date;

    @ManyToOne(() => Email, (email) => email.emailAttempts, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn([{ name: 'EmailId', referencedColumnName: 'id' }])
    email: Email;
}
