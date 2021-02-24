type string_iso_date = string;
type string_url = string;
type currency = 'CZK';

/**
 * Note: not using WithContext<Event> from 'schema-dts' because real production app did not correspond well with this rigid definition
 */
export interface ISemanticEvent {
    [key: string]: string | number | object;
    '@context': 'http://schema.org' | 'https://schema.org';
    '@type': 'Event' | 'EducationEvent';
    startDate: string_iso_date;
    endDate: string_iso_date;
    name: string;
    description: string;
    url: string_url;
    image: string_url;
    eventStatus?: string_url;
    offers?: ISemanticEventOffer[] | ISemanticEventOffer;
    /*location: {
        url: 'https://www.eventbrite.com/e/online-ios-talk-hands-on-mac-catalyst-tickets-140831903013';
        '@type': 'VirtualLocation';
    };*/
    //eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode';

    /*organizer: {
        url: 'https://www.eventbrite.com/o/strv-11110244091';
        description: ' \r\nSTRV is a software design & engineering team. Using our 16 years of experience and the power of technology, we can unlock any business opportunity. With offices in the US and Europe and more than 190 experts on our side, we design and develop digital solutions for the bravest startups and Fortune 500 companies.\r\n ';
        '@type': 'Organization';
        name: 'STRV';
    };*/
}

export interface ISemanticEventOffer {
    // [key: string]: string | number;
    '@type': 'Offer' | 'AggregateOffer';
    name?: string;
    url?: string_url;
    priceCurrency?: currency;
    price?: number;
    lowPrice?: number;
    highPrice?: number;
    availability?: 'InStock';
    availabilityStarts?: string_iso_date;
    availabilityEnds?: string_iso_date;
    validFrom?: string_iso_date;
}
