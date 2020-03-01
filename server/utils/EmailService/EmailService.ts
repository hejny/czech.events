import { IEmailServiceStatus } from './IEmailServiceStatus';
import { IEmailServiceConfig } from './IEmailServiceConfig';
import { Email } from '../../../src/model/database/Email';
import { EmailAttempt } from '../../../src/model/database/EmailAttempt';
import { forTime } from 'waitasecond';
import { Connection } from 'typeorm';
import SqlString from 'sqlstring';
import { constructObjectFromJSON } from '../../../src/utils/constructObjectFromJSON';
import { databaseConnectionPromise } from '../../database';
const email = require('emailjs'); // TODO: Is there some better library?

export class EmailService {
    private smtpClient: any;

    constructor(private config: IEmailServiceConfig) {
        this.connectToSmtp();
        this.initSendingLoop();
    }

    public async send(email: Partial<Email>): Promise<void> {
        // TODO: Maybe purge email

        const databaseConnection = await databaseConnectionPromise;
        // TODO: insert vs. save
        await databaseConnection.manager.insert(Email, constructObjectFromJSON(Email, email));
        return;
    }

    private get subSqls() {
        const { retries, emailLivetime } = this.config.limits;

        // TODO: emailLivetime not implemented
        // TODO: move to feeders

        const successNull = `(SELECT MAX(Success) FROM EmailAttempt WHERE EmailAttempt.EmailId=Email.Id)`;
        const success = `IFNULL(${successNull},0)`;
        const attepmtsCount = `(SELECT COUNT(*) FROM EmailAttempt WHERE EmailAttempt.EmailId=Email.Id)`;
        const lastAttemptTime = `(SELECT Created FROM EmailAttempt WHERE EmailAttempt.EmailId=Email.Id UNION ALL SELECT NOW() - INTERVAL 1 YEAR AS Created ORDER BY Created DESC LIMIT 1)`;
        const emailInQueueCondition = `
        TRUE
        AND ${success} = 0
        AND ${attepmtsCount} < ${SqlString.escape(retries)}
        `;
        return {
            successNull,
            success,
            attepmtsCount,
            lastAttemptTime,
            emailInQueueCondition,
        };
    }

    public async getStatus(): Promise<IEmailServiceStatus> {
        return {
            emailCounts: {
                total: await sqlQueryNumber(`SELECT COUNT(*) FROM Email`),
                queue: await sqlQueryNumber(
                    `SELECT COUNT(*) FROM Email WHERE ${this.subSqls.emailInQueueCondition}`,
                    this.config.limits,
                ),
                success: await sqlQueryNumber(
                    `SELECT COUNT(*) FROM Email WHERE ${this.subSqls.success} = 1`,
                    this.config.limits,
                ),
                error: await sqlQueryNumber(
                    `SELECT COUNT(*) FROM Email WHERE ${this.subSqls.successNull} = 0`,
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
        const databaseConnection = await databaseConnectionPromise;
        try {
            const { emailsInOneTick, retryAfter } = this.config.limits;

            const sql = `
                SELECT 
                    *
                    FROM Email
                    WHERE ${this.subSqls.emailInQueueCondition}
                    AND TIMESTAMPDIFF(SECOND,${this.subSqls.lastAttemptTime},NOW()) > ${SqlString.escape(retryAfter)}
                    LIMIT ${SqlString.escape(emailsInOneTick)}
            `;
            // TODO: Maybe random shuffle

            const emailsData = await databaseConnection.manager.query(sql);

            //console.log('emailsData', emailsData);

            const emails = emailsData.map((emailData: Partial<Email>) =>
                constructObjectFromJSON(Email, emailData),
            ) as Email[];

            await Promise.all(emails.map((email) => this.sendingTickOneEmail(email)));
        } catch (error) {
            console.error(error);
        }
    }

    private async sendingTickOneEmail(email: Email): Promise<void> {
        const databaseConnection = await databaseConnectionPromise;
        //TODO: ? From DB
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

            databaseConnection.manager.insert(
                EmailAttempt,
                constructObjectFromJSON(EmailAttempt, {
                    emailId: email.id,
                    success: true,
                    message: '',
                }),
            );
        } catch (error) {
            databaseConnection.manager.insert(
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
