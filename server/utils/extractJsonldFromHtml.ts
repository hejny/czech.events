import { ISemanticEvent } from '../interfaces/jsonld/ISemanticEvent';

export async function extractJsonldFromHtml(html: string): Promise<ISemanticEvent> {
    const pattern = /<script[\sa-zA-Z0-p-_="']+type=["']application\/ld\+json["'][\sa-zA-Z0-p-_="']*>(.*?)<\/script\s*>/gs;
    /*
    !!!
    text = `
        
      <script type="application/ld+json" nonce="ntn3FDZh">{"\u0040context":"http:\/\/schema.org","\u0040type":"Event","startDate":"2021-02-11T15:00:00+0100","endDate":"2021-02-11T17:00:00+0100","name":"Hybridn\u00ed v\u00fduka","url":"https:\/\/www.facebook.com\/events\/d41d8cd9\/hybridn\u0025C3\u0025AD-v\u0025C3\u0025BDuka\/3507283792730526\/","description":"Hybridn\u00ed v\u00fduka, asynchronn\u00ed v\u00fduka, online v\u00fduka. Co kter\u00fd pojem znamen\u00e1 a jak se na konkr\u00e9tn\u00ed typ v\u00fduky p\u0159ipravit? O tom budeme diskutovat na na\u0161em semin\u00e1\u0159i \u201eHybridn\u00ed v\u00fduka\u201c. C\u00edlem semin\u00e1\u0159e je sd\u00edlet zku\u0161enosti nap\u0159\u00ed\u010d v\u0161emi vzd\u011bl\u00e1vac\u00edmi stupni. Diskutovat o mo\u017enostech v\u00fduky, zapojen\u00ed \u017e\u00e1k\u016f do v\u00fduky a vyu\u017e\u00edv\u00e1n\u00ed v\u0161ech dostupn\u00fdch program\u016f a aplikac\u00ed efektivn\u011b. A t\u0159eba se i nau\u010dit, jak vyu\u017e\u00edt nabit\u00e9 zku\u0161enosti v dob\u011b po Covidu a jak u \u017e\u00e1k\u016f a student\u016f prohlubovat IT schopnosti. \n_______________________________________\nObsah:\n-\tHybridn\u00ed v\u00fduka\n-\tAsynchronn\u00ed v\u00fduka\n-\tInteraktivn\u00ed tabule \/ tablety \/mobiln\u00ed telefony\n-\tDruhy pou\u017e\u00edvan\u00e9ho software\n-\tRozd\u00edly \u017e\u00e1k\u016f v p\u0159\u00edstupu k technice\n-\tKompenzace psychologicko-soci\u00e1ln\u00edch probl\u00e9m\u016f zp\u016fsoben\u00fdch dopady soci\u00e1ln\u00ed distance\n-\tSd\u00edlen\u00ed zku\u0161enost\u00ed (co fungovalo \/ nefungovalo)\n-\tVyu\u017eit\u00ed technologi\u00ed v dob\u011b po Covidu \n_______________________________________\nRegistrace: https:\/\/www.sitport.cz\/akce\/hybridni-vyuka-online-moderovana-diskuse\/\n\n~ ZDARMA ~\n\n","image":"https:\/\/scontent-prg1-1.xx.fbcdn.net\/v\/t1.0-0\/c43.0.206.206a\/p206x206\/145467520_1291306784577689_6644237370038120316_o.jpg?_nc_cat=102&ccb=3&_nc_sid=b386c4&_nc_ohc=pmf1QoGwXxMAX9d96E5&_nc_ht=scontent-prg1-1.xx&tp=27&oh=d2a44556c430333717c5218b8a4ef05d&oe=6057E9B9","performers":[]}</script>

        `;*/

    const jsonlds: ISemanticEvent[] = [];

    // TODO: Can I parse RegExp more elegantly - functionally?
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(html))) {
        const [_, jsonldstring] = match;
        const parsed = JSON.parse(jsonldstring);
        if (parsed instanceof Array) {
            for (const piece of parsed) {
                jsonlds.push(piece);
            }
        } else {
            jsonlds.push(parsed);
        }
    }

    /* !!! if (!parsing) {
        throw new Error(`JSON LD not found`);
    }*/

    const jsonldsEvents = jsonlds.filter((jsonld) => /^.*[eE]vent$/.test(jsonld['@type']));

    if (!jsonldsEvents.length) {
        throw new Error(`There is no parsed event JSON+LD in the html.`);
    }

    return jsonldsEvents[0];
}
