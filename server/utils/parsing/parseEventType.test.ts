import { EventType } from '../../../src/model/database/Event';
import { IJsonldEvent } from '../../interfaces/jsonld/IJsonldEvent';
import { decodeHexDeep } from '../decodeHexDeep';
import { parseEventType } from './parseEventType';
import { parseKeywordsFromJsonldEvent } from './parseKeywordsFromJsonldEvent';
import { parseTimesAndDates } from './parseTimesAndDates';

describe('how parsing event type works', () => {
    it('can detect conference', () => {
        expect(
            parseEventTypeFromSementicEvent({
                '\u0040context': 'http://schema.org',
                '\u0040type': 'Event',
                startDate: '2021-09-15T09:00:00+0200',
                endDate: '2021-09-15T17:00:00+0200',
                eventAttendanceMode: '',
                name: 'FutureEdu: Budoucnost vzd\u011bl\u00e1v\u00e1n\u00ed v digit\u00e1ln\u00ed dob\u011b',
                url:
                    'https://cs-cz.facebook.com/events/opero/futureedu-budoucnost-vzd\u0025C4\u00259Bl\u0025C3\u0025A1v\u0025C3\u0025A1n\u0025C3\u0025AD-v-digit\u0025C3\u0025A1ln\u0025C3\u0025AD-dob\u0025C4\u00259B/198585498929834/',
                location: { '\u0040type': 'Place', name: 'OPERO' },
                description:
                    'Zku\u0161enosti uplynul\u00e9ho roku pomohly znovu a z jin\u00e9 perspektivy nasv\u00edtit n\u011bkter\u00e1 dlouhodob\u00e1 t\u00e9mata a v\u00fdzvy \u010desk\u00e9ho vzd\u011bl\u00e1vac\u00edho syst\u00e9mu. Maj\u00ed v\u0161ichni studenti p\u0159\u00edstup ke kvalitn\u00edmu vzd\u011bl\u00e1v\u00e1n\u00ed? P\u0159ipravuj\u00ed na\u0161e \u0161koly lidi na \u017eivot v digit\u00e1ln\u00ed dob\u011b, s jej\u00edmi v\u00fdhodami i riziky? Maj\u00ed pedagogov\u00e9 i studenti mo\u017enost a pot\u0159ebu se vzd\u011bl\u00e1vat celo\u017eivotn\u011b? Jak m\u00e1 vypadat \u0161kola a v\u00fduka v dob\u011b \u00fapln\u00e9 dostupnosti informac\u00ed? \n\nOdborn\u00e1 konference si klade za c\u00edl p\u0159isp\u011bt k definici vize \u010desk\u00e9ho vzd\u011bl\u00e1vac\u00edho syst\u00e9mu. Jej\u00edm obsahem bude sd\u00edlen\u00ed lok\u00e1ln\u00ed dobr\u00e9 praxe p\u0159\u00edklad\u016f \u0159e\u0161en\u00ed definovan\u00fdch v\u00fdzev, diskuse mezi kl\u00ed\u010dov\u00fdmi institucion\u00e1ln\u00edmi a st\u00e1tn\u00edmi stakeholdery a diskutovat sv\u011btov\u00e9 trendy ve vzd\u011bl\u00e1v\u00e1n\u00ed. Cel\u00fdm dnem v\u00e1s bude prov\u00e1zet Michael Rozsypal.\n\nHlavn\u00ed \u0159e\u010dn\u00edci:\n\n\ud83c\udfa4 Salman Khan (founder Khan Academy)\n\ud83c\udfa4 Robert Plaga (ministr \u0161kolstv\u00ed \u010cR)\n\ud83c\udfa4 Andreas Schleicher (OECD)\n\n\u25b6\ufe0e V\u00edce informac\u00ed o konferenci a konkr\u00e9tn\u00ed program najdete na webu https://www.futureedu.cz/. \u25c0\ufe0e\n\n\u017div\u00fd p\u0159enos konference bude vys\u00edl\u00e1n na kan\u00e1lech vydavatelstv\u00ed Economie - odkaz bude dostupn\u00fd na webu https://www.futureedu.cz/.\n\n\ud83d\udce9 V p\u0159\u00edpad\u011b z\u00e1jmu o fyzickou \u00fa\u010dast kontaktujte Evu \u0160\u00e1lkovou na eva.salkova\u0040opero.cz.',
                image:
                    'https://scontent.fprg5-1.fna.fbcdn.net/v/t1.6435-9/c80.0.206.206a/p206x206/240779384_1304200303315939_115494719489692238_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=b386c4&_nc_ohc=g-rwnFPqzM4AX_auT47&_nc_ht=scontent.fprg5-1.fna&oh=1af866d456b9f58933b39139670e060f&oe=615F5FFF',
                performers: [],
            }),
        ).toEqual(EventType.CONFERENCE);

        expect(
            parseEventTypeFromSementicEvent({
                '@context': 'https://schema.org',
                '@type': 'Event',
                name: 'Coding4Good 2021',
                description:
                    '&lt;p&gt;Kombinovan&#xE1; (offline / online) konference zam&#x11B;&#x159;en&#xE1; na v&#xFD;voj&#xE1;&#x159;e a hard-skilled pracovn&#xED;ky z technologick&#xE9; sf&#xE9;ry, studenty S&#x160; / V&#x160;, startupy i korpor&#xE1;ty, kte&#x159;&#xED; cht&#x11B;j&#xED; n&#x11B;jak&#xFD;m zp&#x16F;sobem p&#x159;isp&#x11B;t ke zlep&#x161;ov&#xE1;n&#xED; sv&#x11B;ta.&lt;/p&gt;&#xD;&#xA;&lt;h2&gt;Program konference&lt;/h2&gt;&#xD;&#xA;&lt;ol&gt;&#xD;&#xA;&lt;li&gt;Michal Valta - Jak m&#x16F;&#x17E;e psan&#xED; k&#xF3;du zlep&#x161;ovat sv&#x11B;t?&lt;/li&gt;&#xD;&#xA;&lt;li&gt;Prof. RNDr. V&#xED;t Vo&#x17E;en&#xED;lek, Csc - Co studovat, abych mohl i j&#xE1; p&#x159;isp&#x11B;t k trvale udr&#x17E;iteln&#xE9; zm&#x11B;n&#x11B;&lt;/li&gt;&#xD;&#xA;&lt;li&gt;David Stan&#x10D;&#xED;k - Zalo&#x17E;il jsem startup a naprogramoval aplikaci Daruju krev&lt;/li&gt;&#xD;&#xA;&lt;li&gt;Lud&#x11B;k Role&#x10D;ek - Jak m&#x16F;&#x17E;u jako v&#xFD;voj&#xE1;&#x159; zv&#xFD;&#x161;it zastoupen&#xED; &#x17E;en v IT?&lt;/li&gt;&#xD;&#xA;&lt;li&gt;Mgr. Ad&#xE9;la B&#xE1;rtov&#xE1; - Jak um&#x11B;l&#xE1; inteligence zachra&#x148;uje &#x17E;ivoty?&lt;/li&gt;&#xD;&#xA;&lt;li&gt;Panelov&#xE1; diskuze se v&#x161;emi vystupuj&#xED;c&#xED;mi&lt;/li&gt;&#xD;&#xA;&lt;li&gt;Slosov&#xE1;n&#xED; o iPhone 12 - sout&#x11B;&#x17E; pro &#xFA;&#x10D;astn&#xED;ky s registrac&#xED;&lt;/li&gt;&#xD;&#xA;&lt;li&gt;Voln&#xFD; networking a raut&lt;/li&gt;&#xD;&#xA;&lt;/ol&gt;',
                url: 'https://it.katalogakci.cz/e-1646/coding4good-2021',
                eventStatus: 'EventScheduled',
                eventAttendanceMode: 'OfflineEventAttendanceMode',
                startDate: '2021-09-14T18:00:00&#x2B;02:00',
                endDate: '2021-09-14T21:00:00&#x2B;02:00',

                location: {
                    '@type': 'Place',
                    name: 'Coworkingov&#xE9; centrum Telegraph',
                    url: 'https://it.katalogakci.cz/p-353/coworkingove-centrum-telegraph',
                    address: {
                        '@type': 'PostalAddress',
                        streetAddress: 'Jungmannova 3',
                        addressLocality: 'Olomouc',
                        postalCode: '779 00',
                        addressCountry: '&#x10C;esko',
                    },

                    geo: {
                        '@type': 'GeoCoordinates',
                        latitude: '49.590673',
                        longitude: '17.276404',
                    },
                },
                image: 'https://it.katalogakci.cz/Attachment/Image/181',
                organizer: {
                    '@type': 'Organization',
                    name: 'viaGood',
                    url: 'https://www.viagood.app/',
                },
            }),
        ).toEqual(EventType.CONFERENCE);

        expect(
            parseEventTypeFromSementicEvent({
                '\u0040context': 'http://schema.org',
                '\u0040type': 'Event',
                startDate: '2021-09-30T08:00:00+0200',
                endDate: '2021-10-01T12:00:00+0200',
                eventAttendanceMode: '',
                name: 'Inovujeme Plze\u0148 2021',
                url:
                    'https://cs-cz.facebook.com/events/cukrovarsk\u0025C3\u0025A1-20-plze\u0025C5\u002588/inovujeme-plze\u0025C5\u002588-2021/956068355189849/',
                location: { '\u0040type': 'Place', name: 'Cukrovarsk\u00e1 20, Plze\u0148' },
                description:
                    'Plze\u0148 je m\u011bsto inovac\u00ed, v\u00fdvoje a v\u00fdzkumu. \n\nFestival Inovujeme Plze\u0148 ukazuje atraktivn\u00ed projekty budoucnosti, pokrok technologi\u00ed, st\u00e1v\u00e1 se m\u00edstem nev\u0161edn\u00edch z\u00e1\u017eitk\u016f a zaj\u00edmav\u00fdch setk\u00e1n\u00ed - mo\u017en\u00e1 t\u011bch kl\u00ed\u010dov\u00fdch pro rozjezd kari\u00e9ry. \nT\u0159et\u00ed ro\u010dn\u00edk akce, kterou organizuje m\u011bsto Plze\u0148, se odehraje ve \u010dtvrtek 30. z\u00e1\u0159\u00ed a v p\u00e1tek 1. \u0159\u00edjna v are\u00e1lu SIT Port, Cukrovarsk\u00e1 ul. v Plzni. \nN\u00e1v\u0161t\u011bvn\u00edci zde uvid\u00ed technologie z oblasti um\u011bl\u00e9 inteligence, d\u00e1le tak\u00e9 \u0159e\u0161en\u00ed pro chytr\u00e1 m\u011bsta, pr\u016fmyslov\u00e9 inovace od region\u00e1ln\u00edch firem a v\u00fdzkum z univerzitn\u00edho prost\u0159ed\u00ed. V leto\u0161n\u00edm roce bude p\u0159ipravena tak\u00e9 konference Smart City.\n\n',
                image:
                    'https://scontent.fprg5-1.fna.fbcdn.net/v/t1.6435-9/c80.0.206.206a/p206x206/197923672_1376581042716929_5412772673843574171_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=b386c4&_nc_ohc=Djqpb19pMPcAX8EDem7&_nc_ht=scontent.fprg5-1.fna&oh=07c73056e3be65a2df1a429907ab4ee1&oe=615F63CC',
                performers: [],
            }),
        ).toEqual(EventType.CONFERENCE);
    });

    /*
    TODO:
    it('can detect meetup', () => {
        expect(parseEventTypeFromSementicEvent({...})).toEqual(EventType.MEETUP);
    });
    */

    it('can detect workshop', () => {
        expect(
            parseEventTypeFromSementicEvent({
                '@context': 'https://schema.org',
                '@type': 'Event',
                name: 'Webin\u00e1\u0159: Odprezentujte sv\u016fj n\u00e1pad skv\u011ble hned napoprv\u00e9',
                description:
                    'T\u0159et\u00ed ze s\u00e9rie bezplatn\u00fdch webin\u00e1\u0159\u016f, kter\u00e9 dopl\u0148uj\u00ed sout\u011b\u017e STARTupUJ NA VYSO\u010cIN\u011a.Jak\u00e1 t\u00e9mata v\u00e1s \u010dekaj\u00ed? \tKter\u00e1 komunika\u010dn\u00ed m\u00e9dia jsou vhodn\u00e1 pro r\u016fzn\u00e9 typy prezentac\u00ed? \tStruktura a form\u00e1t \u201epitche\u201c \tKter\u00e9 n\u00e1stroje pou\u017e\u00edt, kdy\u017e nem\u00e1te extern\u00edho grafika (a \u010das)? \tJak se odprezentovat \u017eiv\u00e9mu a online publiku? \tN\u00e1zorn\u00e9 sezn\u00e1men\u00ed s online n\u00e1stroji a pracovn\u00edm postupem \tPro\u010d to odprezentov\u00e1n\u00edm nekon\u010d\u00ed?Co si odnesete? \tZnalost, jak si vytvo\u0159it \u201epitch\u201c prezentaci, kter\u00e1 zaujme publikum \tN\u00e1stroj na vytvo\u0159en\u00ed prezentace ve skv\u011bl\u00e9 grafice \tVyvr\u00e1cen\u00e9 nej\u010dast\u011bj\u0161\u00ed prezenta\u010dn\u00ed m\u00fdty',
                image: 'https://www.czechstartups.org/wp-content/uploads/2021/04/davidsvoboda4-219x146.jpg',
                eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
                eventStatus: 'https://schema.org/EventScheduled',
                startDate: '2021/09/16 16:00',
                endDate: '2021/09/16 17:30',
                location: {
                    '@type': 'Place',
                    name: 'Online at home',
                    address: { '@type': 'PostalAddress', telephone: '', streetAddress: '' },
                },
            }),
        ).toEqual(EventType.WORKSHOP);

        expect(
            parseEventTypeFromSementicEvent({
                '@context': 'https://schema.org',
                '@type': 'Event',
                name: 'Workshop: Guest from Izrael - Michael Mizrahi',
                description:
                    'P\u0159ij\u010fte si poslechnout p\u0159\u00edb\u011bh o tom, jak se Izrael stal zem\u00ed startup\u016f.\u00a0Michael v\u00e1m na p\u0159\u00edkladu samotn\u00e9ho Jeruzal\u00e9ma uk\u00e1\u017ee,\u00a0jak vybudovat komunitu a startup ekosyst\u00e9m \u00fapln\u011b od za\u010d\u00e1tku.\u00a0Dozv\u00edte se, jak Izrael p\u0159istupuje k\u00a0inovac\u00edm a podnik\u00e1n\u00ed anebo to,\u00a0\u010d\u00edm se ve startupov\u00e9m prost\u0159ed\u00ed li\u0161\u00ed Jeruzal\u00e9m od Tel Avivu.\u00a0 V neposledn\u00ed \u0159ad\u011b si budete moct vytvo\u0159it\u00a0sv\u016fj vlastn\u00ed mini startup ekosyst\u00e9m.\u00a0Cel\u00e1 p\u0159edn\u00e1\u0161ka bude prob\u00edhat v anglick\u00e9m jazyce.Workshop prob\u011bhne v \u00fater\u00fd 21. z\u00e1\u0159\u00ed\u00a0od 18:00 do 19:30 na\u00a0Vysok\u00e9 \u0161kole ekonomick\u00e9 v Praze\u00a0(u\u010debna RB 206).Registrujte se ZDE.',
                image: 'https://www.czechstartups.org/wp-content/uploads/2021/09/2021-09-07-11_58_17-Start-260x64.png',
                eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
                eventStatus: 'https://schema.org/EventScheduled',
                startDate: '2021/09/21 18:00',
                endDate: '2021/09/21 19:30',
                location: {
                    '@type': 'Place',
                    name: 'Vysok\u00e1 \u0161kola ekonomick\u00e1 v Praze',
                    address: {
                        '@type': 'PostalAddress',
                        telephone: '',
                        streetAddress: 'n\u00e1m. Winstona Churchilla 1938/4, 130 67 Praha 3-\u017di\u017ekov',
                    },
                },
            }),
        ).toEqual(EventType.WORKSHOP);
    });

    /*
    TODO:
    it('can detect hackathon', () => {
        expect(parseEventTypeFromSementicEvent({...})).toEqual(EventType.HACKATHON);
    });

    */
});

function parseEventTypeFromSementicEvent(jsonldEvent: IJsonldEvent) {
    jsonldEvent = decodeHexDeep(jsonldEvent);
    jsonldEvent = { description: '', ...jsonldEvent };
    const { durationInHours } = parseTimesAndDates({ jsonldEvent });
    const { keywordsFromName, keywordsFromDescription } = parseKeywordsFromJsonldEvent({ jsonldEvent });
    const { type } = parseEventType({ keywordsFromName, keywordsFromDescription, jsonldEvent, durationInHours });
    return type;
}
