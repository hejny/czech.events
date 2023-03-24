import { useState } from 'react';
import { ApiClient } from '../../api/ApiClient';
import { Event } from '../../model/database/Event';
import { DateRange, RangeConstant } from '../../model/DateRange';
import { Partners } from '../Partners/Partners';
import { SubscribeForm } from '../SubscribeForm/SubscribeForm';
// TODO: Remove @deprecated import { Newsletter } from '../model/database/Newsletter';
import Image from 'next/image';
import czechEventsTransparentLogoFit from '../../../public/design/logos/czech.events.transparent-logo.fit.png';
import { useAsyncMemo } from '../../utils/useAsyncMemo';
import { TalksPageEmail } from '../TalksPageEmail/TalksPageEmail';

interface ITalksPageProps {
    /**
     * @deprecated Events are passed via getStaticProps
     * @deprecated use prepared React context to pass apiClient
     */
    apiClient: ApiClient;

    prerenderedEvents: Event[];
}

const OPTIONS = [
    {
        value: 'CURRENT_MONTH-NEXT_MONTH',
        desc: 's aktuálním děním:',
    },
    {
        value: 'NEXT_MONTH-NEXT_NEXT_MONTH',
        desc: 'na další měsíc:',
    },

    /*
    {
        value: 'NOW-INFINITY',
        desc: 'se všemi událostmi, co právě evidujeme do budoucna:',
    },
    {
        value: 'INFINITY-INFINITY',
        desc: 'se všemi událostmi, co právě evidujeme:',
    },
    */
];

export function TalksPage(props: ITalksPageProps) {
    const { apiClient, prerenderedEvents } = props;

    const [range, setRange] = useState<DateRange>(DateRange.fromConstant('CURRENT_MONTH-NEXT_MONTH'));

    const currentEvents = useAsyncMemo(async () => {
        try {
            return await apiClient.getEvents();
        } catch (error) {
            if (!(error instanceof Error)) {
                throw error;
            }

            console.error(error);
        }
    }, [apiClient]);

    return (
        // TODO: Why so many nested groups - cleanup this
        <div className="page">
            <div className="group">
                <div className="front black">
                    <div className="inner">
                        <div className="head">
                            <Image src={czechEventsTransparentLogoFit} alt="Czech.events logo" width={200} />

                            <h1>Mějte přehled o nejzajímavějších událostech z IT &amp; startupového světa.</h1>
                        </div>

                        {/*TODO: Semantically h2 is not very ideal here*/}
                        <h2 className="font-light">
                            Dejte nám Vaší emailovou adresu a my Vám budeme pravidelně jednou za měsíc posílat co se
                            děje:
                        </h2>
                        <SubscribeForm {...{ apiClient }} />

                        {/*TODO: Semantically h2 is not very ideal here at all*/}
                        <h2 className="line separator font-light">
                            A jak takový mail vypadá? Tady máte živou ukázku z rozpracovaného mailu
                            <select
                                className={'font-light select-inline'}
                                onChange={(event) =>
                                    void setRange(DateRange.fromConstant(event.target.value as RangeConstant))
                                }
                            >
                                {OPTIONS.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.desc}
                                    </option>
                                ))}
                            </select>
                        </h2>
                    </div>
                </div>

                <div className="letter white">
                    {/*
                        TODO: Or make tabs - see bellow
                        <div className="tab" onClick={() => this.setState({ range: DateRange.CURRENT_MONTH })}>
                            Aktuání měsíc
                        </div>
                        <div className="tab" onClick={() => this.setState({ range: DateRange.ALL })}>
                            Vše
                        </div>
                         */}

                    <div className="inner">
                        {/*
                            TODO: Here can be a selecotr of the months but firstly we need to add backend and better DB so it is not priority now.

                            TODO: Or maybe like this:
                            <select>
                                <option>Aktuální měsíc</option>
                                <option>Budoucí události</option>
                                <option>Budoucí události tento měsíc</option>
                                <option>Vše</option>
                            </select>

                            */}
                        <TalksPageEmail
                            {...{
                                events: currentEvents || prerenderedEvents,
                                // TODO: Remove @deprecated newsletter: newsletter,
                                range,
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="group">
                <Partners />
            </div>
        </div>
    );
}

/**
 * TODO: [🥞] Make here some footer
 * TODO: [🥞] Common skeleton - logo + footer for all pages
 * TODO: This should be using Next API and be server - pre-rendered
 */
