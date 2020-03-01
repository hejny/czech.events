import { IEmailServiceStatus } from './IEmailServiceStatus';
import { IEmailServiceConfig } from './IEmailServiceConfig';
import { Email } from '../../../src/model/database/Email';
import { EmailAttempt } from '../../../src/model/database/EmailAttempt';
import { forTime } from 'waitasecond';
import { Connection } from 'typeorm';
import SqlString from 'sqlstring';
import { constructObjectFromJSON } from 'src/utils/constructObjectFromJSON';

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
    private smtpClient: any;

    constructor(private config: IEmailServiceConfig, private databaseConnection: Connection) {
        this.connectToSmtp();
        this.initSendingLoop();
    }

    public async send(email: Partial<Email>): Promise<void> {
        // TODO: Maybe purge email
        await this.databaseConnection.manager.insert(Email, constructObjectFromJSON(Email, email));
        return;
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

    private async connectToSmtp() {
        this.smtpClient = email.server.connect(this.config.smtpConnection);
    }

    private async initSendingLoop() {
        while (true) {
            await forTime(this.config.limits.sendFrequency * 1000);
            this.sendingTick();
        }
    }

    public async sendingTick(): Promise<void> {
        try {
            const { emailsInOneTick, retryAfter, emailLivetime, retries } = this.config.limits;

            /**
            ,${sendSubSql} as send
            ,${attepmtsCountSubSql} as attepmtsCount
            ,${lastAttemptTimeSubSql} as lastAttemptTime
            */
            const sqlStructure = `
                SELECT 
                    *
                    FROM Email
                    WHERE ${emailInQueueCondition}
                    AND TIMESTAMPDIFF(SECOND,${lastAttemptTimeSubSql},NOW())>:retryAfter
                    LIMIT :emailsInOneTick
            `;
            // TODO: Maybe random shuffle

            const sql = SqlString.format(sqlStructure, {
                emailsInOneTick,
                retryAfter,
                emailLivetime,
                retries,
            });

            const [emailsData] = await this.databaseConnection.manager.query(sql);

            console.log('emailsData', emailsData);

            const emails = emailsData.map((emailData: Partial<Email>) =>
                constructObjectFromJSON(Email, emailData),
            ) as Email[];

            await Promise.all(emails.map((email) => this.sendingTickOneEmail(email)));
        } catch (error) {
            console.error(error);
        }
    }

    private async sendingTickOneEmail(email: Email): Promise<void> {
        //TODO: From DB
        try {
            await new Promise((resolve, reject) => {
                const messageWithAttachment = {
                    from: email.from,
                    to: email.to,
                    subject: email.subject,
                    text: stripHTMLTags(email.body),
                    attachment: [
                        {
                            data: email.body.split('\n').join('<br/>'),
                            alternative: true,
                        },
                    ],
                };

                this.smtpClient.send(messageWithAttachment, (error: any, result: any) =>
                    error ? reject(error) : resolve(result),
                );
            });

            this.databaseConnection.manager.insert(
                EmailAttempt,
                constructObjectFromJSON(EmailAttempt, {
                    emailId: email.id,
                    success: true,
                    message: '',
                }),
            );
        } catch (error) {
            this.databaseConnection.manager.insert(
                EmailAttempt,
                constructObjectFromJSON(EmailAttempt, {
                    emailId: email.id,
                    success: false,
                    message: error.message,
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
    return null;
    /* TODO: implement
    try {
        const result = await knex.raw(sql, params);
        const row = result[0][0];
        const value = row[Object.keys(row)[0]];
        return value;
    } catch (error) {
        console.error(error);
        return null;
    }
    */
}
