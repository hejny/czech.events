import { parseNameAndTopic } from './parseNameAndTopic';

describe('how parsing name and topic works', () => {
    it('can parsing name witout topic', () => {
        expect(parseNameAndTopic(`Machine Learning Prague 2020`)).toEqual({ name: `Machine Learning`, topic: null });
        expect(parseNameAndTopic(`HackPrague 2021 hackathon`)).toEqual({ name: `HackPrague hackathon`, topic: null });
        expect(parseNameAndTopic(`Hackers Congress Paralelní Polis 2020 ▲ Prague`)).toEqual({
            name: `Hackers Congress Paralelní Polis`,
            topic: null,
        });
        expect(parseNameAndTopic(`StartUp Boat Night Vol. IV`)).toEqual({ name: `StartUp Boat Night`, topic: null });
        expect(parseNameAndTopic(`Regionální finále Soutěž & Podnikej- Olomouc 2020`)).toEqual({
            name: `Regionální finále Soutěž & Podnikej`,
            topic: null,
        });
        expect(parseNameAndTopic(`Business pivo`)).toEqual({ name: `Business pivo`, topic: null });
        expect(parseNameAndTopic(`FOSDEM 2021`)).toEqual({ name: `FOSDEM`, topic: null });
        expect(parseNameAndTopic(`Hybridní výuka`)).toEqual({ name: `Hybridní výuka`, topic: null });
        expect(parseNameAndTopic(`Konference Pražský Barcamp 2021`)).toEqual({
            name: `Konference Pražský Barcamp`,
            topic: null,
        });
        expect(parseNameAndTopic(`Flutter onAir 2021`)).toEqual({ name: `Flutter onAir`, topic: null });
        expect(parseNameAndTopic(`44. sraz přátel PHP v Praze v Driveto a Glami`)).toEqual({
            name: `Sraz přátel PHP v Driveto a Glami`,
            topic: null /* TODO: How to parse it better */,
        });
    });

    it('can parsing name and topic', () => {
        expect(parseNameAndTopic(`CzechFuture.tech #1 – konference o technologiích budoucnosti`)).toEqual({
            name: `CzechFuture.tech`,
            topic: `Konference o technologiích budoucnosti`,
        });
        expect(parseNameAndTopic(`FuckUp Night Prague Vol. XXXVI - Staying Alive`)).toEqual({
            name: `FuckUp Night`,
            topic: `Staying Alive`,
        });
        expect(parseNameAndTopic(`Online iOS Talk: Instruments 101`)).toEqual({
            name: `iOS Talk`,
            topic: `Instruments 101`,
        });
        expect(parseNameAndTopic(`TopMonks Caffè: Večer kreslení a malování`)).toEqual({
            name: `TopMonks Caffè`,
            topic: `Večer kreslení a malování`,
        });
        expect(parseNameAndTopic(`Bitcoin Meetup | Bitcoin software`)).toEqual({
            name: `Bitcoin Meetup`,
            topic: `Bitcoin software`,
        });
        expect(parseNameAndTopic(`Scitalks | Jan Blažek - Algoritmy v umění`)).toEqual({
            name: `Scitalks`,
            topic: `Jan Blažek - Algoritmy v umění`,
        });
    });
});
