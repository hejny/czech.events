import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Email } from './Email';

@Index('Email_id', ['email_id'], {})
@Index('Success', ['success'], {})
@Index('Created', ['created'], {})
@Entity('EmailAttempt', {})
export class EmailAttempt {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;

    @Column('int', { name: 'email_id' })
    email_id: number;

    @Column('tinyint', { name: 'success' })
    success: boolean;

    @Column('text', { name: 'message' })
    message: string;

    @Column('datetime', { name: 'created', default: () => 'CURRENT_TIMESTAMP' })
    created: Date;

    @ManyToOne(
        () => Email,
        (email) => email.emailAttempts,
        { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
    )
    @JoinColumn([{ name: 'email_id', referencedColumnName: 'id' }])
    email: Email;
}
