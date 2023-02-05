import { removeTiming } from './removeTiming';

describe('how removing of order and timing works', () => {
    it('removes a year', () => {
        expect(removeTiming('Machine Learning Prague 2020')).toEqual('Machine Learning Prague');
        expect(removeTiming('InnoCamp 2020')).toEqual('InnoCamp');
        expect(removeTiming('BrMo 2020')).toEqual('BrMo');
        expect(removeTiming('Nette Camp 2020')).toEqual('Nette Camp');
        expect(removeTiming('Frontendisti.cz – Hospodský sraz 09.06.')).toEqual('Frontendisti.cz – Hospodský sraz');
        expect(removeTiming('CZSK PPUG Setkání a povídání 08/21')).toEqual('CZSK PPUG Setkání a povídání');
        expect(removeTiming('CZSK PPUG Setkání a povídání 09/21')).toEqual('CZSK PPUG Setkání a povídání');
        expect(removeTiming('CZSK PPUG Setkání a povídání 11/21')).toEqual('CZSK PPUG Setkání a povídání');
        expect(removeTiming('CZSK PPUG Setkání a povídání 10/21')).toEqual('CZSK PPUG Setkání a povídání');
        expect(removeTiming('HackPrague 2021 hackathon')).toEqual('HackPrague hackathon');
    });

    it('removes full date', () => {
        expect(removeTiming('Event 9.6.2021')).toEqual('Event');
        expect(removeTiming('Event 09.06.2021')).toEqual('Event');
        expect(removeTiming('Event 2021/6/9')).toEqual('Event');
        expect(removeTiming('Event 2021-6-9')).toEqual('Event');
    });

    it('removes date', () => {
        expect(removeTiming('Event 09.06.')).toEqual('Event');
        expect(removeTiming('Event 09.06')).toEqual('Event');
        expect(removeTiming('Event 9.6')).toEqual('Event');
    });

    it(`not removes numbers that may look like date but thay ain't`, () => {
        expect(removeTiming('Demokracie 2.0')).toEqual('Demokracie 2.0');
        expect(removeTiming('Demokracie 2.1')).toEqual('Demokracie 2.1');
        expect(removeTiming('Demokracie 3.0')).toEqual('Demokracie 3.0');
    });

    it('removes an order number', () => {
        expect(removeTiming('CzechFuture.tech #1')).toEqual('CzechFuture.tech');
        expect(removeTiming('StartUp Boat Night Vol. IV')).toEqual('StartUp Boat Night');
        expect(removeTiming('FuckUp Night Vol. XXXVI – Staying Alive')).toEqual('FuckUp Night – Staying Alive');
        expect(removeTiming('Regionální finále Soutěž & Podnikej – I')).toEqual(
            'Regionální finále Soutěž & Podnikej –',
        );
        expect(removeTiming('Regionální finále Soutěž & Podnikej – II')).toEqual(
            'Regionální finále Soutěž & Podnikej –',
        );
        expect(removeTiming('Battle Bots vol. 4')).toEqual('Battle Bots');
        // TODO: expect(removeTiming('Návrhové vzory – dev meetup 05')).toEqual('Návrhové vzory – dev meetup');
        expect(removeTiming('Kotlin Meetup #8')).toEqual('Kotlin Meetup');
        expect(removeTiming('Data Science Nights III – Data Analysis from T to B')).toEqual(
            'Data Science Nights – Data Analysis from T to B',
        );
        expect(removeTiming('44. sraz přátel PHP v Praze v Driveto a Glami')).toEqual(
            'sraz přátel PHP v Praze v Driveto a Glami',
        );
        expect(removeTiming('11. Sraz přátel PHP v Pardubicích')).toEqual('Sraz přátel PHP v Pardubicích');
        expect(removeTiming('INNOMEET – 1. setkání')).toEqual('INNOMEET – setkání');
        expect(removeTiming('Startup Boat Night Vol. V')).toEqual('Startup Boat Night');
        expect(removeTiming('Startup Boat Night Vol. V')).toEqual('Startup Boat Night');
        expect(removeTiming('Wolves Summit 14')).toEqual('Wolves Summit');
    });

    it('not removes a number that is probbably not a year nor a order number', () => {
        expect(removeTiming('Machine Learning Prague 202020')).toEqual('Machine Learning Prague 202020');
        expect(removeTiming('101011')).toEqual('101011');
        expect(removeTiming('Forbes 30 POD 30')).toEqual('Forbes 30 POD 30');
        expect(removeTiming('Barcamp 2.0')).toEqual('Barcamp 2.0');
        expect(removeTiming('Společnost 4.0')).toEqual('Společnost 4.0');
        expect(removeTiming('Infrastruktura v kódu – dev 04: showtime')).toEqual(
            'Infrastruktura v kódu – dev 04: showtime',
        );
        expect(removeTiming('Case studies roulette – 20 years of Agile!')).toEqual(
            'Case studies roulette – 20 years of Agile!',
        );
        expect(removeTiming('Hackathon vzdělávání 2.0')).toEqual('Hackathon vzdělávání 2.0');
        expect(removeTiming('48 for the Future')).toEqual('48 for the Future');
        expect(removeTiming('Něco i něco jiného v Praze')).toEqual('Něco i něco jiného v Praze');

        // TODO: There should be preserved .NET 6 and C# 10 as they are versions of the software not number of the event
        //       >  expect(removeTiming('Co nás čeká v .NET 6')).toEqual('Co nás čeká v .NET 6');
        //       >  expect(removeTiming('Co nás čeká v .NET 6 a C# 10')).toEqual('Co nás čeká v .NET 6 a C# 10');
    });
});
