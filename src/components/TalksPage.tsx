import * as React from 'react';
import { fetchEvents } from '../utils/fetchEvents';
import { EventComponent } from './EventComponent';
import { LoadingComponent } from './LoadingComponent';
import { ErrorComponent } from './ErrorComponent';
import { Event } from '../model/Event';
import { Form } from './Form';
import { translateEventType } from '../utils/translate';
import { categorizeEvents } from '../utils/categorizeEvents';
import { IEventsCategorized } from '../model/IEventsCategorized';
import { DateRange } from '../model/DateRange';
import { IEvents } from '../model/IEvents';

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
        let categorizedEvents: null | IEventsCategorized;

        if (this.state.events) {
            const filteredEvents = this.state.events.filter((event) =>
                event instanceof Event ? this.state.range.isIn(event.date) : true,
            );

            //console.log('filteredEvents', filteredEvents);
            categorizedEvents = categorizeEvents(filteredEvents);
        } else {
            categorizedEvents = null;
        }

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
                            <h2>{`📅 Konference / meetupy / hackathony – co se děje z IT / Startupové akce 🌆`}</h2>
                            <br />
                            <br />
                            Ahoj,
                            <br />
                            opět jsme dali dohromady seznam událostí, na které se vyplatí zajít.
                            <br />
                            {/*
                        <p>Ve čtvrtek 7.11 se bude konat ...</p>
                        <p>Ve čtvrtek 7.11 se bude konat ...</p>
                        */}
                            {this.state.error && (
                                <ErrorComponent>
                                    <pre>{this.state.error}</pre>
                                </ErrorComponent>
                            )}
                            {!categorizedEvents ? (
                                <LoadingComponent />
                            ) : (
                                Object.keys(categorizedEvents).map((type) => (
                                    <p key={type}>
                                        <h2>{translateEventType(type as any)}</h2>
                                        <span>
                                            {categorizedEvents![type].map((item, key) =>
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
                            PS: <b>Budeme rádi za vaše návrhy a připomínky</b>, můžete <b>odpovědět rovnou na email</b>.
                            <br />
                            PPS: Pokud už nechcete dostat další email, klikněte sem pro jejich odhlášení.
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
