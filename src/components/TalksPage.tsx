import * as React from 'react';
import { DateRange } from '../model/DateRange';
import { IEvents } from '../model/IEvents';
import { fetchEvents } from '../utils/fetchEvents';
import { ErrorComponent } from './ErrorComponent';
import { Form } from './Form';
import { LoadingComponent } from './LoadingComponent';
import { TalksPageEmail } from './TalksPageEmail';

interface ITalksPageProps {}

interface ITalksPageState {
    error: null | string;
    range: DateRange;
    events: null | IEvents;
}

export class TalksPage extends React.Component<ITalksPageProps, ITalksPageState> {
    state: ITalksPageState = {
        error: null,
        range: DateRange.FROM_CURRENT_MONTH,
        events: null,
    };

    constructor(props: ITalksPageProps) {
        super(props);
        this.loadEvents();
    }

    private async loadEvents() {
        try {
            const events = await fetchEvents();
            //console.log('events', events);
            this.setState({ events });
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
                            <h2 className="font-light">
                                Dejte nám Vaší emailovou adresu a my Vám budeme pravidelně jednou za měsíc posílat co se
                                děje:
                            </h2>
                            <Form />

                            <h2 className="separator font-light">
                                A jak takový mail vypadá? Tady máte živou ukázku z rozpracovaného mailu na další měsíc:
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
                                <TalksPageEmail {...{ events: this.state.events, range: this.state.range }} />
                            )}
                        </div>
                    </div>

                    <footer className="footer black">{/*TODO:*/}</footer>
                </div>
            </>
        );
    }
}
