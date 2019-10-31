import * as React from 'react';
import { Layout } from '../components/Layout';
import { fetchEvents } from '../utils/fetchEvents';
import { NextPageContext } from 'next';
import { EventComponent } from '../components/EventComponent';
import { LoadingComponent } from '../components/LoadingComponent';
import { ErrorComponent } from '../components/ErrorComponent';
import { Event } from '../model/Event';
import { MailChimpForm } from '../components/MailChimpForm';

interface TalksPageProps {
    error?: string;
    events?: (Event)[];
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
                <h2>Konference</h2>
                {!this.props.events ? (
                    <LoadingComponent />
                ) : (
                    this.props.events.map((event, key) => <EventComponent {...{ event, key }} />)
                )}
                {/*
                <a href="https://www.barcampbrno.cz/2019/index.html"><b>DevOps Summit</b>  – Budoucnost je v udržitelnosti</a>
                🌆&nbsp;Ostrava 📅&nbsp;Čtvrtek 3. Října ⏱️&nbsp;10:00 💸&nbsp;450 Kč
                */}
                <h2>Meetupy</h2>
                <h2>Workshopy</h2>
                <h2>Hackathony</h2>
                Pavol & Tereza
            </Layout>
        );
    }
}
