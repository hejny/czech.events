import * as React from 'react';
import { Layout } from '../components/Layout';
import { fetchEvents } from '../utils/fetchEvents';
import { NextPageContext } from 'next';
import { EventComponent } from '../components/EventComponent';
import { LoadingComponent } from '../components/LoadingComponent';
import { ErrorComponent } from '../components/ErrorComponent';
import { Event, EventType } from '../model/Event';
import { MailChimpForm } from '../components/MailChimpForm';
import { enumToArray } from '../utils/enumToArray';
import { translateEventType } from '../utils/translate';

interface TalksPageProps {
    error?: string;
    events?: (Event | string)[];
}

interface TalksPageState {}
export default class TalksPage extends React.Component<TalksPageProps, TalksPageState> {
    static getInitialProps = async ({ query }: NextPageContext) => {
        try {
            //const { id } = query;
            const events = await fetchEvents();
            console.log('events', events);

            return { events };
        } catch (error) {
            console.log('error', error);
            return { error: error.message };
        }
    };

    render() {
        return (
            <Layout title="Události">
                <div className="background">
                    <img src="img ntwrk.svg" alt="Test" />
                </div>
                <div className="front">
                    <h1>
                        Hey, wanna hear about upcoming tech <br /> events in the Czech Republic?
                        {/*about me, etc. */}
                    </h1>
                    <h2 className="font-light">Join us and sign up for monthly overview here!</h2>
                    <MailChimpForm />
                </div>

                <div className="event-wrapper">
                    <p>
                        Ahoj, opět jsme dali dohromady seznam událostí, na které se vyplatí zajít.
                        <br />
                        <br />
                        <br />
                        {this.props.error && (
                            <ErrorComponent>
                                <pre>{this.props.error}</pre>
                            </ErrorComponent>
                        )}
                        {enumToArray(EventType).map((type) => (
                            <div key={type}>
                                <h2>{translateEventType(type as any)}</h2>
                                {!this.props.events ? (
                                    <LoadingComponent />
                                ) : (
                                    this.props.events
                                        .filter((eventOrError: string | Event) => {
                                            if (eventOrError instanceof Event) {
                                                return type === ((eventOrError.type as unknown) as string);
                                            } else {
                                                return true;
                                            }
                                        })
                                        .map((eventOrError: string | Event, key: number) =>
                                            eventOrError instanceof Event ? (
                                                <EventComponent {...{ event: eventOrError, key }} />
                                            ) : (
                                                <ErrorComponent>{eventOrError}</ErrorComponent>
                                            ),
                                        )
                                )}
                            </div>
                        ))}
                        PS: Budeme rádi za vaše návrhy a připomínky, můžete odpovědět rovnou na email. PPS: Pokud už
                        nechceš dostat další email, hoď nám prostě rychlou odpověď.
                    </p>
                </div>

                <footer className="footer">
                    <a href="https://www.linkedin.com/in/hejny/">Pavol</a>&
                    <a href="https://www.linkedin.com/in/tereza-texlova/">Tereza</a>
                </footer>
            </Layout>
        );
    }
}
