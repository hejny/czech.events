export interface IWPFromResponse {
    // TODO: Do better from documentation or code
    //into: string;
    status: 'mail_sent' | 'validation_failed' /*TODO: Maybe more*/;
    message: string;
}

/*
{
"into": "#",
"status": "mail_sent",
"message": "Děkujeme Vám. Vaše zpráva byla úspěšně odeslána."
}


{
"into": "#",
"status": "validation_failed",
"message": "Některá pole obsahují chybu. Opravte prosím zadané údaje a zkuste to znovu.",
"invalidFields": [
    {
    "into": "span.wpcf7-form-control-wrap.email",
    "message": "Zadaná emailová adresa není platná.",
    "idref": null
    }
]
}

*/
