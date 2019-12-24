import * as React from 'react';
import { fetchEvents } from '../utils/fetchEvents';
import { EventComponent } from './EventComponent';
import { LoadingComponent } from './LoadingComponent';
import { ErrorComponent } from './ErrorComponent';
import { Event } from '../model/Event';
import { Form } from './Form';
import { translateEventType } from '../utils/translate';
import { IEventsCategorized, categorizeEvents } from '../utils/categorizeEvents';
import { filterEvents } from '../utils/filterEvents';

interface ITalksPageProps {}

interface ITalksPageState {
    error: null | string;
    categorizedEvents: null | IEventsCategorized;
}

export class TalksPage extends React.Component<ITalksPageProps, ITalksPageState> {
    state: ITalksPageState = {
        error: null,
        categorizedEvents: null,
    };

    constructor(props: ITalksPageProps) {
        super(props);
        this.loadEvents();
    }

    private async loadEvents() {
        try {
            //const { id } = query;
            const events = await fetchEvents();
            //console.log('events', events);

            const filteredEvents = filterEvents(events);
            const categorizedEvents = categorizeEvents(events);

            //const events: any = [];

            this.setState({ categorizedEvents });
        } catch (error) {
            //console.log('error', error);
            this.setState({ error: error.message });
        }
    }

    render() {
        return (
            <>
                <div className="content">
                    <div className="front black">
                        <div className="inner">
                            <h1>Máme přehled o nejzajímavějších událostech z IT &amp; startupového světa.</h1>
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
                        <div className="inner">
                            {/*
                            TODO: Here can be a selecotr of the months but firstly we need to add backend and better DB so it is not priority now.
                            <select>
                                <option>Prosinec</option>
                                <option>Leden</option>
                            </select>
                            */}

                            <h2>{`📅 Konference / meetupy / hackathony – co se děje z IT / Startupové akce 🌆`}</h2>

                            <p>
                                <p>
                                    Ahoj,
                                    <br />
                                    opět jsme dali dohromady seznam událostí, na které se vyplatí zajít.
                                </p>
                                {/*
                        <p>Ve čtvrtek 7.11 se bude konat ...</p>
                        <p>Ve čtvrtek 7.11 se bude konat ...</p>
                        */}
                                {this.state.error && (
                                    <ErrorComponent>
                                        <pre>{this.state.error}</pre>
                                    </ErrorComponent>
                                )}
                                {!this.state.categorizedEvents ? (
                                    <LoadingComponent />
                                ) : (
                                    Object.keys(this.state.categorizedEvents).map((type) => (
                                        <p key={type}>
                                            <h2>{translateEventType(type as any)}</h2>
                                            <span>
                                                {this.state.categorizedEvents![type].map((item, key) =>
                                                    item instanceof Event ? (
                                                        <EventComponent {...{ event: item, key }} />
                                                    ) : (
                                                        <ErrorComponent {...{ key }}>{item}</ErrorComponent>
                                                    ),
                                                )}
                                            </span>
                                        </p>
                                    ))
                                )}
                                <br />
                                <br />
                                PS: <b>Budeme rádi za vaše návrhy a připomínky</b>, můžete{' '}
                                <b>odpovědět rovnou na email</b>.
                                <br />
                                PPS: Pokud už nechcete dostat další email, klikněte sem pro jejich odhlášení.
                            </p>
                        </div>
                    </div>

                    <footer className="footer black">
                        <a href="https://www.pavolhejny/">Pavol</a>
                        &nbsp;&amp;&nbsp;
                        <a href="https://www.linkedin.com/in/tereza-texlova/">Tereza</a>
                    </footer>
                </div>
            </>
        );
    }
}
