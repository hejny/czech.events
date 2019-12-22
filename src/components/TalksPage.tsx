import * as React from 'react';
import { fetchEvents } from '../utils/fetchEvents';
import { EventComponent } from './EventComponent';
import { LoadingComponent } from './LoadingComponent';
import { ErrorComponent } from './ErrorComponent';
import { Event, EventType } from '../model/Event';
import { Form } from './Form';
import { enumToArray } from '../utils/enumToArray';
import { translateEventType } from '../utils/translate';
import networkImage from '../network.svg';

interface ITalksPageProps {}

interface ITalksPageState {
    error: null | string;
    events: (Event | string)[];
}

export class TalksPage extends React.Component<ITalksPageProps, ITalksPageState> {
    state: ITalksPageState = {
        error: null,
        events: [],
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

            //const events: any = [];

            this.setState({ events });
        } catch (error) {
            //console.log('error', error);
            this.setState({ error: error.message });
        }
    }

    render() {
        return (
            <>
                <div className="background">
                    <img src={networkImage} alt="Síť" />
                </div>
                <div className="front black">
                    <h1>
                        Hey, wanna hear about upcoming tech <br /> events in the Czech Republic?
                        {/*about me, etc. */}
                    </h1>
                    <h2 className="font-light">Join us and sign up for monthly overview here!</h2>
                    <Form />
                </div>

                <div className="event-wrapper white">
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
                        {enumToArray(EventType).map((type) => (
                            <p key={type}>
                                <h2>{translateEventType(type as any)}</h2>
                                {!this.state.events ? (
                                    <LoadingComponent />
                                ) : (
                                    this.state.events
                                        .filter((eventOrError: string | Event) => {
                                            if (eventOrError instanceof Event) {
                                                return type === ((eventOrError.type as unknown) as string);
                                            } else {
                                                return true;
                                            }
                                        })
                                        .map((eventOrError: string | Event, key: number) => (
                                            <span key={key}>
                                                {eventOrError instanceof Event ? (
                                                    <EventComponent {...{ event: eventOrError }} />
                                                ) : (
                                                    <ErrorComponent>{eventOrError}</ErrorComponent>
                                                )}
                                            </span>
                                        ))
                                )}
                            </p>
                        ))}
                        <br />
                        <br />
                        PS: <b>Budeme rádi za vaše návrhy a připomínky</b>, můžete <b>odpovědět rovnou na email</b>.
                        <br />
                        PPS: Pokud už nechcete dostat další email, klikněte sem pro jejich odhlášení.
                    </p>
                </div>

                <footer className="footer black">
                    <a href="https://www.pavolhejny/">Pavol</a>
                    &nbsp;&amp;&nbsp;
                    <a href="https://www.linkedin.com/in/tereza-texlova/">Tereza</a>
                </footer>
            </>
        );
    }
}
