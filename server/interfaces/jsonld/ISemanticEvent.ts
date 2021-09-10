type string_iso_date = string;
type string_url = string;
type currency = 'CZK' | 'USD' | 'EUR';

/**
 * This is just apporximated version of JSON+LD semantic event taken from real data of some sites!!!
 *
 * Note: not using WithContext<Event> from 'schema-dts' (or other advanced library) because real production app did not correspond well with this rigid definition
 */
export interface ISemanticEvent {
    [key: string]: string | number | object;
    '@context': 'http://schema.org' | 'https://schema.org';
    '@type': 'Event' | 'EducationEvent';
    startDate: string_iso_date;
    endDate: string_iso_date;
    name: string;
    description: string;
    url?: string_url;
    image?: string_url;
    eventStatus?: string_url;
    eventAttendanceMode?:
        | 'OfflineEventAttendanceMode'
        | 'https://schema.org/OfflineEventAttendanceMode'
        | 'OnlineEventAttendanceMode'
        | 'https://schema.org/OnlineEventAttendanceMode'
        | string_url;
    offers?: ISemanticEventOffer[] | ISemanticEventOffer;
    location?: ISemanticPlace | ISemanticPlaceVirtual;

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

    performers?: any;
}

export interface ISemanticEventOffer {
    // [key: string]: string | number;
    '@type': 'Offer' | 'AggregateOffer';
    name?: string;
    url?: string_url;
    priceCurrency?: currency;
    price?: number | string;
    lowPrice?: number;
    highPrice?: number;
    availability?: 'https://schema.org/InStock' | 'InStock';
    availabilityStarts?: string_iso_date;
    availabilityEnds?: string_iso_date;
    validFrom?: string_iso_date;
}

export interface ISemanticPlace {
    '@type': 'Place';
    name: string;
    url?: string_url;
    address?: {
        '@type': 'PostalAddress';
        streetAddress: string;
        addressLocality?: string;
        postalCode?: string;
        addressCountry?: string;
        telephone?: string;
    };
    geo?: ISemanticGeoCoordinates;
}

export interface ISemanticPlaceVirtual {
    '@type': 'VirtualLocation';
    url: string_url;
}

export interface ISemanticGeoCoordinates {
    '@type': 'GeoCoordinates';
    latitude: number | string;
    longitude: number | string;
}
