import * as React from 'react';
import { Layout } from '../components/Layout';


interface TalksPageProps {
    //error?: string;
    //talks: Talk[];
}

interface TalksPageState {}
export default class TalksPage extends React.Component<TalksPageProps, TalksPageState> {
    /*static getInitialProps = async ({ query }: NextPageContext) => {
        return {};
        try {
            //const { id } = query;
            //const talks = await fetchEvents();
            //return { talks };
        } catch (error) {
            //return { error: error.message };
        }
    };*/

    render() {

        return (
            <Layout title="Události">
                <h1>Události</h1>
                
                Píšeme pravidelný měsíční email o IT / Startupových eventech v Čechách - meetupy, konference, hackathony a workshopy.

                Pokud máš zájem:


                Napadá tě událost, která nemá na seznamu chybět? Pošli nám ji.




                <h2>Konference</h2>


                <a href="https://www.barcampbrno.cz/2019/index.html"><b>DevOps Summit</b>  – Budoucnost je v udržitelnosti</a>
                🌆&nbsp;Ostrava 📅&nbsp;Čtvrtek 3. Října ⏱️&nbsp;10:00 💸&nbsp;450 Kč


                <h2>Meetupy</h2>

                <h2>Workshopy</h2>

                <h2>Hackathony</h2>


                Pavol & Tereza

                
            </Layout>
        );
    }
}
