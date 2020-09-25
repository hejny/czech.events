import { Event, EventType } from '../../src/model/database/Event';

export function parseJsonldToEvent(eventJsonld: any, url: string): Partial<Event> {
    try {
        const startDate = new Date(eventJsonld.startDate);
        const endDate = new Date(eventJsonld.endDate);

        const days =
            startDate.getDate() === endDate.getDate()
                ? startDate.getDate().toString()
                : `${startDate.getDate()}-${endDate.getDate()}`;

        let type = EventType.CONFERENCE;

        const keywords = `${eventJsonld.name} ${eventJsonld.description}`.toLowerCase();
        if (keywords.includes('hackathon') || keywords.includes('startup weekend')) type = EventType.HACKATHON;
        if (keywords.includes('meetup')) type = EventType.MEETUP;
        if (keywords.includes('sraz')) type = EventType.MEETUP;
        if (keywords.includes('workshop')) type = EventType.WORKSHOP;

        // TODO: Also detect meetup vs. conference by duration

        // TODO: !!! Canceled
        // TODO: !!! Online

        const { name, topic } = parseNameAndTopic(eventJsonld.name);

        return {
            serializeId: url,
            name,
            topic,
            type,
            web: url,
            city: eventJsonld?.location?.address?.addressLocality,
            year: startDate.getFullYear(),
            month: startDate.getMonth() + 1,
            days,
            time: `${startDate
                .getHours()
                .toString()
                .padStart(2, '0')}:${startDate
                .getMinutes()
                .toString()
                .padStart(2, '0')}`,
            price: null,
            priceCurrency: null,

            //visibility: EventVisibility;
            //note: string | null;
        };
    } catch (error) {
        console.error(error);
        console.info(eventJsonld);
        throw new Error(`Can not create Event`);
    }
}

function parseNameAndTopic(
    fullName: string /* Maybe a description as input? */,
): { name: string; topic: string | null } {
    // TODO: !!! Cleanup

    fullName = fullName.replace(/\(.*?\)/g, ''); // Removing things in (brackets)
    fullName = fullName.replace(new Date().getFullYear().toString(), ''); // Removing current year
    fullName = fullName.replace(/Praha|Prague|Bratislava/, ''); // Removing city
    // TODO: Full list of the cities

    const result = /\s*(?<name>.*)\s*(–|(\-)|(\#\d+)|(\|))\s*(?<topic>.*)\s*/.exec(fullName);

    if (result) {
        let { name, topic } = result.groups!;
        name = trimCoreName(name);
        topic = trimCoreName(topic);
        return { name, topic };
    }

    return { name: trimCoreName(fullName), topic: null };
}

function trimCoreName(fullName: string): string {
    fullName = fullName.replace(/^[^a-zA-Z0-9ěščřžýáíéúůĚŠČŘŽÝÁÍÉÚŮ]+/, '');
    fullName = fullName.replace(/[^a-zA-Z0-9ěščřžýáíéúůĚŠČŘŽÝÁÍÉÚŮ]+$/, '');
    return fullName;
}

/*{
    '@context': 'http://schema.org',
    '@type': 'Event',
    startDate: '2019-11-22T09:00:00+0100',
    endDate: '2019-11-24T18:00:00+0100',
    name: 'Global Smart Health Hackathon Prague 2019',
    url: 'https://cs-cz.facebook.com/events/ikem/global-smart-health-hackathon-prague-2019/283765772518477/',
    location: {
        '@type': 'Place',
        name: 'IKEM',
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'CZ',
            addressLocality: 'Praha',
            postalCode: '140 21',
            streetAddress: 'Vídeňská 1958/9',
        },
    },
    description:
        '👩🏾‍⚕️ 👨‍⚕️👨🏽‍⚕️ 👩‍⚕️ Come to Prague to Create the Future of Medicine and WIN 4 000 EUR. 💰💰💰 Registrations are now closed - Thank you for your interest! Challenges: 1. 3D Printed Matrix for Pancreatic Islets Transplantation 2. Blood Sugar Level 3. Predict Patient Behaviour 4. Treatment Guide 5. No More Waiting! 6. Five-star hospital 7. Alzheimer/Elderly Patient Family Management 8. Diseases of Affluence Including Social Media Addiction 9. Adherence and Compliance 10. Quality Control for Automated Image Analysis More info here: https://www.ceehacks.com/#challenges 🏥 😷 💊 💉 💓 Whatever your hack, do not miss your chance to present your prototypes in front of global healthcare leaders. Do you have what it takes? Get ready! The Hackathon takes place at Institute for Clinical and Experimental Medicine in Prague. Under auspices of @[489450987825894:274:Ministerstvo zdravotnictví České republiky] @[190469767638040:274:Praha.eu] @[113661665312187:274:Kraj Vysočina] @[934710489922771:274:1.lékařská Fakulta UK] @[102147743174285:274:Univerzita Jana Evangelisty Purkyně v Ústí nad Labem - UJEP] @[2227516004154741:274:Česká lékařská společnost Jana Evangelisty Purkyně - ČLS JEP pro veřejnost] Thanks to our partners @[322550194442758:274:IKEM] @[333118533686469:274:Penta Hospitals CZ] @[134937073279530:274:Dr.Max Lékárna] @[481443878717320:274:Pronatal] @[891423417653697:274:MEDICON] @[284727735502814:274:ICZ Group] @[223138427780595:274:DNAnexus] @[1496619370615359:274:VZP ČR] @[297841233673:274:uLekare.cz] @[1483331098544959:274:Loono] @[399769070443142:274:Maker Faire Prague] @[116405316399868:274:Nation 1 VC] @[154286804687093:274:Ergoactiv] @[137983189567818:274:IBM Česká republika] @[159349897488050:274:Confidence Digital] @[1902805183378821:274:Pizza Hut Česká republika] @[1496619370615359:274:VZP ČR] @[223138427780595:274:DNAnexus] @[147958921897855:274:Boehringer Ingelheim]',
    image:
        'https://scontent-prg1-1.xx.fbcdn.net/v/t1.0-0/c91.0.200.200a/p200x200/55491762_2165478507115723_4102065394020253696_o.jpg?_nc_cat=109&_nc_sid=b386c4&_nc_ohc=4rY2lNPAgQIAX-jaPdP&_nc_ht=scontent-prg1-1.xx&oh=93e63fef12b6b7575bfe07d4d248b8fb&oe=5F5BCAF7',
    performers: {},
}*/
