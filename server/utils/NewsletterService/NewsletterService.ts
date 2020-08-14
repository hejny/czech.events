import { Newsletter } from '../../../src/model/database/Newsletter';
import { Subscriber } from '../../../src/model/database/Subscriber';
import { forTime } from 'waitasecond';
import { constructObjectFromJSON } from '../../../src/utils/constructObjectFromJSON';
import { databaseConnectionPromise } from '../../database';
import { EmailService } from '../EmailService/EmailService';
import { INewsletterServiceStatus } from './INewsletterServiceStatus';

// TODO: to waitasecond
export async function forTimeSynced(period: number, shift: number = 0): Promise<void> {
    const currentTime = new Date().getTime();
    const wait = period - ((currentTime - shift) % period);
    await forTime(wait);
}

/*
(async () => {
    while (true) {
        await forTimeSynced(10 * 1000, 1 * 1000);
        console.log('Tick', new Date());
    }
})();
/**/

export class NewsletterService {
    constructor(private emailService: EmailService) {
        this.initSendingLoop(true);
    }

    public async getStatus(): Promise<INewsletterServiceStatus> {
        return {};
    }

    private async initSendingLoop(test: boolean) {
        //if (test) {
            while (true) {
                //await forTimeSynced(10 * 60 * 1000, 7 * 60 * 1000);
                try{
                await forTime(60 * 60 * 1000);
                await this.emailService.send({
                    to: 'me@pavolhejny.com',
                    from: 'me+czech.events@pavolhejny.com',
                    subject: 'Czech.events - NewsletterService tick',
                    body: 'test<hr/>test',
                });
                }catch(error){
                    console.error(error);
                }
                //this.sendingTick(test);
            }
        /*} else {
            while (true) {
                await forTimeSynced(this.emailService.config.limits.sendFrequency * 1000);
                this.sendingTick(test);
            }
        }*/
    }

    public async sendingTick(test: boolean): Promise<void> {
        const databaseConnection = await databaseConnectionPromise;
        try {
            const sql = `
                SELECT 
                    *
                    FROM Newsletter
                    WHERE TRUE
                    ${test ? '' : 'AND send >= NOW()'}
                    /*AND (SELECT COUNT(*) FROM Email WHERE Email.newsletter_id=Newsletter.id AND Email.test=0)*/
                    /* TODO: Maybe some better way how to figure out Newsletter is sent? */
            `;

            const newslettersData = await databaseConnection.manager.query(sql);

            //console.log('newslettersData', newslettersData);

            const newsletters = newslettersData.map((newsletterData: Partial<Newsletter>) =>
                constructObjectFromJSON(Newsletter, newsletterData),
            ) as Newsletter[];

            await Promise.all(newsletters.map((newsletter) => this.sendingTickOneNewsletter(newsletter, test)));
        } catch (error) {
            console.error(error);
        }
    }

    private async sendingTickOneNewsletter(newsletter: Newsletter, test: boolean): Promise<void> {
        const databaseConnection = await databaseConnectionPromise;
        let subscribers = await databaseConnection.manager.find(Subscriber, { where: test ? { test: 1 } : {} });
        subscribers = [subscribers[0]]; // TODO: Remove after testing

        for (const subscriber of subscribers) {
            await this.emailService.send({
                newsletter_id: newsletter.id,
                to: subscriber.email,
                from: newsletter.from,
                subject: newsletter.name!,
                body: 'test<hr/>test',
            });
        }
    }
}
