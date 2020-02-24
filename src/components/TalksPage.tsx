import * as React from 'react';
import { DateRange, RangeConstant } from '../model/DateRange';
import { ErrorComponent } from './ErrorComponent';
import { Form } from './Form';
import { LoadingComponent } from './LoadingComponent';
import { TalksPageEmail } from './TalksPageEmail';
import { Event } from '../model/database/Event';
import { apiClient } from '../api/ApiClient';
import { Newsletter } from '../model/database/Newsletter';

interface ITalksPageProps {}

interface ITalksPageState {
    error: null | string;
    range: DateRange;
    events: null | Event[];
    newsletter: null | Newsletter;
}

export class TalksPage extends React.Component<ITalksPageProps, ITalksPageState> {
    state: ITalksPageState = {
        error: null,
        range: DateRange.fromConstants('CURRENT_MONTH', 'NEXT_MONTH'),
        events: null,
        newsletter: null,
    };

    constructor(props: ITalksPageProps) {
        super(props);
        this.load();
    }

    private async load() {
        try {
            const events = await apiClient.getEvents();
            //console.log('events', events);
            this.setState({ events });

            const newsletter = await apiClient.getNewsletter(2020, 2 /* TODO: Unhardcode */);
            //console.log('newsletter', newsletter);
            this.setState({ newsletter });
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    render() {
        return (
            <>
                <div className="content">
                    <div className="front black">
                        <div className="inner">
                            <h1>Mějte přehled o nejzajímavějších událostech z IT &amp; startupového světa.</h1>
                            {/*TODO: Semantically h2 is not very ideal here*/}
                            <h2 className="font-light">
                                Dejte nám Vaší emailovou adresu a my Vám budeme pravidelně jednou za měsíc posílat co se
                                děje:
                            </h2>
                            <Form />

                            {/*TODO: Semantically h2 is not very ideal here at all*/}
                            <h2 className="separator font-light">
                                A jak takový mail vypadá? Tady máte živou ukázku z rozpracovaného mailu
                                <select
                                    className={'font-light option-in-text'}
                                    onChange={(event) => {
                                        const [beginConstant, endConstant] = event.target.value.split(
                                            '-',
                                        ) as RangeConstant[];

                                        const range = DateRange.fromConstants(beginConstant, endConstant);
                                        /*console.log(
                                            event.target.value,
                                            DateRange.fromConstant(beginConstant),
                                            DateRange.fromConstant(endConstant),
                                            range,
                                        );*/

                                        this.setState({ range });
                                    }}
                                >
                                    <option value="CURRENT_MONTH-NEXT_MONTH">
                                        na další měsíc + události tohoto měsíce:
                                    </option>
                                    <option value="NEXT_MONTH-NEXT_NEXT_MONTH">na další měsíc:</option>
                                    <option value="NOW-INFINITY">
                                        se všemi událostmi, co právě evidujeme do budoucna:
                                    </option>
                                    <option value="INFINITY-INFINITY">se všemi událostmi, co právě evidujeme:</option>
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
                                        newsletter: this.state.newsletter,
                                        range: this.state.range,
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
