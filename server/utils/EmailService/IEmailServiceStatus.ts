import { IEmailServiceConfigLimits } from './IEmailServiceConfig';
import { EmailAttempt } from '../../../src/model/database/EmailAttempt';

export interface IEmailServiceStatus {
    emailCounts: {
        total: number | null;
        queue: number | null;
        success: number | null;
        error: number | null;
    };
    emailAttemptCounts: {
        total: number | null;
        success: number | null;
        error: number | null;
    };
    limits: IEmailServiceConfigLimits;

    //sendingTicks: IEmailServiceStatusTick[];
}

// TODO: Maybe remove
export interface IEmailServiceStatusTick {
    date: Date;
    attempts: EmailAttempt[];
}
