import * as React from 'react';
import { ApiClient } from '../api/ApiClient';
import { Event } from '../model/database/Event';
import { DateRange, RangeConstant } from '../model/DateRange';
import { ErrorComponent } from './ErrorComponent';
import { Form } from './Form';
import { LoadingComponent } from './LoadingComponent';
import { PageDiv } from './PageDiv';
// TODO: Remove @deprecated import { Newsletter } from '../model/database/Newsletter';
import { Partners } from './Partners';
import { TalksPageEmail } from './TalksPageEmail';

interface ITalksPageProps {
    selfUrl: string;

    /**
     * @deprecated use prepared React context to pass apiClient
     */
    apiClient: ApiClient;
}

interface ITalksPageState {
    error: null | string;
    range: DateRange;
    events: null | Event[];
    // TODO: Remove @deprecated newsletter: null | Newsletter;
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

export class TalksPage extends React.Component<ITalksPageProps, ITalksPageState> {
    state: ITalksPageState = {
        error: null,
        range: DateRange.fromConstant('CURRENT_MONTH-NEXT_MONTH'),
        events: null,
        // TODO: Remove @deprecated newsletter: null,
    };

    constructor(props: ITalksPageProps) {
        super(props);
        this.load();
    }

    private async load() {
        try {
            const events = await this.props.apiClient.getEvents();
            //console.log('events', events);
            this.setState({ events });

            // TODO: Remove @deprecated const newsletter = await this.props.apiClient.getNewsletter(2020, 2 /* TODO: Unhardcode */);
            // TODO: Remove @deprecated //console.log('newsletter', newsletter);
            // TODO: Remove @deprecated this.setState({ newsletter });
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    render() {
        return (
            <PageDiv>
                <div className="front black">
                    <div className="inner">
                        <h1>Mějte přehled o nejzajímavějších událostech z IT &amp; startupového světa.</h1>
                        {/*TODO: Semantically h2 is not very ideal here*/}
                        <h2 className="font-light">
                            Dejte nám Vaší emailovou adresu a my Vám budeme pravidelně jednou za měsíc posílat co se
                            děje:
                        </h2>
                        <Form {...{ apiClient: this.props.apiClient }} />

                        {/*TODO: Semantically h2 is not very ideal here at all*/}
                        <h2 className="line separator font-light">
                            A jak takový mail vypadá? Tady máte živou ukázku z rozpracovaného mailu
                            <select
                                className={'font-light option-in-text'}
                                onChange={(event) => {
                                    const range = DateRange.fromConstant(event.target.value as RangeConstant);
                                    /*console.log(
                                            event.target.value,
                                            DateRange.fromConstant(beginConstant),
                                            DateRange.fromConstant(endConstant),
                                            range,
                                        );*/

                                    this.setState({ range });
                                }}
                            >
                                {OPTIONS.map((item) => (
                                    <option value={item.value}>{item.desc}</option>
                                ))}
                            </select>
                        </h2>

                        {/*TODO: Semantically h2 is not very ideal here at all*/}
                        <h2 className="line separator font-light warning">
                            🦠 Vzhledem k pandemii bohužel fungujeme na poloviční výkon –⁠ evidujeme mnohem méně akcí a
                            ne každý měsíc rozesíláme email.
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

                        {this.state.error ? (
                            <ErrorComponent>
                                <pre>{this.state.error}</pre>
                            </ErrorComponent>
                        ) : !this.state.events ? (
                            <LoadingComponent />
                        ) : (
                            <TalksPageEmail
                                {...{
                                    events: this.state.events,
                                    // TODO: Remove @deprecated newsletter: this.state.newsletter,
                                    range: this.state.range,
                                }}
                            />
                        )}
                    </div>
                </div>

                <Partners {...{ selfUrl: this.props.selfUrl }} />
            </PageDiv>
        );
    }
}
