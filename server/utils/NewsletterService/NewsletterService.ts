import { Newsletter } from '../../../src/model/database/Newsletter';
import { Subscriber } from '../../../src/model/database/Subscriber';
import { forTime } from 'waitasecond';
import { constructObjectFromJSON } from '../../../src/utils/constructObjectFromJSON';
import { databaseConnectionPromise } from '../../database';
import { EmailService } from '../EmailService/EmailService';
import { INewsletterServiceStatus } from './INewsletterServiceStatus';

export class NewsletterService {
    constructor(private emailService: EmailService) {
        this.initSendingLoop();
    }

    public async getStatus(): Promise<INewsletterServiceStatus> {
        return {};
    }

    private async initSendingLoop() {
        while (true) {
            // TODO: forTimePersistent in waitasecond library
            await forTime(this.emailService.config.limits.sendFrequency * 1000);
            this.sendingTick();
        }
    }

    public async sendingTick(): Promise<void> {
        const databaseConnection = await databaseConnectionPromise;
        try {
            const sql = `
                SELECT 
                    *
                    FROM Newsletter
                    WHERE TRUE
                    AND send >= NOW()
                    AND (SELECT COUNT(*) FROM Email WHERE Email.newsletter_id=Newsletter.Id /*TODO: And not our testing emails*/)
            `;

            const newslettersData = await databaseConnection.manager.query(sql);

            //console.log('emailsData', emailsData);

            const newsletters = newslettersData.map((newsletterData: Partial<Newsletter>) =>
                constructObjectFromJSON(Newsletter, newsletterData),
            ) as Newsletter[];

            await Promise.all(newsletters.map((newsletter) => this.sendingTickOneNewsletter(newsletter)));
        } catch (error) {
            console.error(error);
        }
    }

    private async sendingTickOneNewsletter(newsletter: Newsletter): Promise<void> {
        const databaseConnection = await databaseConnectionPromise;
        const subscribers = await databaseConnection.manager.find(Subscriber, { id: 1 /* TODO: TESTING flag here*/ });

        for (const subscriber of subscribers) {
            await this.emailService.send({
                to: subscriber.email,
                from: newsletter.from,
                subject: 'test',
                body: 'test',
            });
        }
    }
}
