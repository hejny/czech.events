import { ISmtpConnectionConfig } from './ISmtpConnectionConfig';

export interface IEmailServiceConfig {
    /*
    TODO: Maybe?
    databaseOrmObjects:{
        email: IEmail;
        emailAttempt: IEmailAttempt;
    };
    databaseFunctions:{
        insert: (object: IEmail|IEmailAttempt)=>Promise<void>;
        query: (sql: string)=>Promise<void>;
    }
    databaseTableNames:{
        email: string;
        emailAttempt: string;
    }*/
    smtpConnection: ISmtpConnectionConfig;
    limits: IEmailServiceConfigLimits;
}

export interface IEmailServiceConfigLimits {
    // TODO: Naming
    sendFrequency: number; // In seconds
    emailsInOneTick: number;
    retryAfter: number; // In seconds
    emailLivetime: number; // In seconds
    retries: number;
}

/*
 TODO: Maybe?
export interface IEmail {
    readonly Id: number;
    From: string;
    To: string;
    Subject: string;
    Body: string;
    Created: Date;
    Flag?: string;
    Note?: string;
    EmailAttempts?: IEmailAttempt[];
}
export interface IEmailAttempt {
    readonly Id: number;
    EmailId: number;
    Success: boolean;
    Message?: string;
    Created: Date; // = new Date();
    email?: IEmail;
}
*/
