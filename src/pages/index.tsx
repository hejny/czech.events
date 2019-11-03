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
                <h1>Události</h1>
                Píšeme pravidelný měsíční email o IT / Startupových eventech v Čechách - meetupy, konference, hackathony
                a workshopy. Pokud máš zájem:
                <MailChimpForm />
                Napadá tě událost, která nemá na seznamu chybět? Pošli nám ji.
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
                Pavol & Tereza
            </Layout>
        );
    }
}
