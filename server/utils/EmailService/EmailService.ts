import { IEmailServiceStatusTick, IEmailServiceStatus } from './IEmailServiceStatus';
import { IEmailServiceConfig } from './IEmailServiceConfig';
import { IEmailMessage } from './IEmailMessage';
import { Email } from '../../../src/model/database/Email';
import { EmailAttempt } from '../../../src/model/database/EmailAttempt';
import { forTime } from 'waitasecond';

const email = require('emailjs');

const successSubSqlNull = `(SELECT MAX(Success) FROM EmailAttempt WHERE EmailAttempt.EmailId=Email.Id)`;
const successSubSql = `IFNULL(${successSubSqlNull},0)`;
const attepmtsCountSubSql = `(SELECT COUNT(*) FROM EmailAttempt WHERE EmailAttempt.EmailId=Email.Id)`;
const lastAttemptTimeSubSql = `(SELECT Created FROM EmailAttempt WHEREEmailAttempt.EmailId=Email.Id UNION ALL SELECT NOW() - INTERVAL 1 YEAR AS Created ORDER BY Created DESC LIMIT 1)`;
const emailInQueueCondition = `
TRUE
AND ${successSubSql} = 0
AND ${attepmtsCountSubSql} < :retries
`;

export class EmailService {
    private server: any;
    private sendingTicks: IEmailServiceStatusTick[] = []; // TODO: Maybe remove

    constructor(private config: IEmailServiceConfig) {
        this.connect();
        this.initSendingLoop();
    }

    public async send(message: IEmailMessage): Promise<number> {
        const { from: From, subject: Subject, body: Body, to: To } = message;
        const email = await Email.query().insert(
            new Email({
                From,
                To,
                Subject,
                Body,
            }),
        );
        const { Id } = email;
        return Id;
    }

    public async getStatus(): Promise<IEmailServiceStatus> {
        return {
            emailCounts: {
                total: await sqlQueryNumber(`SELECT COUNT(*) FROM Email`),
                queue: await sqlQueryNumber(
                    `SELECT COUNT(*) FROM Email WHERE ${emailInQueueCondition}`,
                    this.config.limits,
                ),
                success: await sqlQueryNumber(
                    `SELECT COUNT(*) FROM Email WHERE ${successSubSql} = 1`,
                    this.config.limits,
                ),
                error: await sqlQueryNumber(
                    `SELECT COUNT(*) FROM Email WHERE ${successSubSqlNull} = 0`,
                    this.config.limits,
                ),
            },
            emailAttemptCounts: {
                total: await sqlQueryNumber(`SELECT COUNT(*) FROM EmailAttempt`),
                success: await sqlQueryNumber(`SELECT COUNT(*) FROM EmailAttempt WHERE Success = 1`),
                error: await sqlQueryNumber(`SELECT COUNT(*) FROM EmailAttempt WHERE Success = 0`),
            },
            limits: this.config.limits,
        };
    }

    private connect() {
        this.server = email.server.connect(this.config.smtpConnection);
    }

    private async initSendingLoop() {
        while (true) {
            await forTime(this.config.limits.sendFrequency * 1000);
            this.sendingTick();
        }
    }

    public async sendingTick(): Promise<EmailAttempt[]> {
        try {
            const { emailsInOneTick, retryAfter, emailLivetime, retries } = this.config.limits;

            /**
            ,${sendSubSql} as send
            ,${attepmtsCountSubSql} as attepmtsCount
            ,${lastAttemptTimeSubSql} as lastAttemptTime
            */
            const sql = `
                SELECT 
                    *
                    FROM ${Email.tableName}
                    WHERE ${emailInQueueCondition}
                    AND TIMESTAMPDIFF(SECOND,${lastAttemptTimeSubSql},NOW())>:retryAfter
                    LIMIT :emailsInOneTick
            `;
            // TODO: Maybe random shuffle

            const [emailsData] = await Email.raw(sql, { emailsInOneTick, retryAfter, emailLivetime, retries });
            const emails = emailsData.map((emailData: Partial<Email>) => new Email(emailData)) as Email[];

            const attempts = await Promise.all(emails.map((email) => this.sendingTickOneEmail(email)));

            this.sendingTicks.push({
                date: new Date(),
                attempts,
            });

            return attempts;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    private async sendingTickOneEmail(email: Email): Promise<EmailAttempt> {
        //TODO: From DB
        try {
            const result = await new Promise((resolve, reject) => {
                const messageWithAttachment = {
                    from: email.From,
                    to: email.To,
                    subject: email.Subject,
                    text: stripHTMLTags(email.Body),
                    attachment: [
                        {
                            data: email.Body.split('\n').join('<br/>'),
                            alternative: true,
                        },
                    ],
                };

                this.server.send(messageWithAttachment, (error: any, result: any) =>
                    error ? reject(error) : resolve(result),
                );
            });

            return EmailAttempt.query().insert(
                new EmailAttempt({
                    EmailId: email.Id,
                    Success: true,
                    Message: '',
                }),
            );
        } catch (error) {
            return EmailAttempt.query().insert(
                new EmailAttempt({
                    EmailId: email.Id,
                    Success: false,
                    Message: error.message,
                }),
            );
        }
    }
}

// TODO: Better name
function stripHTMLTags(input: string) {
    // TODO: is it complete?
    return input.replace(/<\/?[^>]+(>|$)/g, '');
}

async function sqlQueryNumber(sql: string, params: any = {}): Promise<number | null> {
    try {
        const result = await knex.raw(sql, params);
        const row = result[0][0];
        const value = row[Object.keys(row)[0]];
        return value;
    } catch (error) {
        console.error(error);
        return null;
    }
}
