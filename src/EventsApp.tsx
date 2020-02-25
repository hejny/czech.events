import { createHashHistory, History } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Switch } from 'react-router-dom';
import { ApiClient } from './api/ApiClient';
import { AboutPage } from './components/AboutPage';
import { TalksPage } from './components/TalksPage';
import './index.css';
import * as serviceWorker from './serviceWorker';

// TODO: Join app and createApp
export class EventsApp {
    private apiClient: ApiClient;
    private history: History;

    constructor(private rootElement: HTMLDivElement, private apiUrl: string) {
        console.log(`Starting EventsApp with apiUrl = "${apiUrl}".`);
        this.run();
    }

    private async run() {
        this.history = createHashHistory();
        this.apiClient = new ApiClient(this.apiUrl);

        ReactDOM.render(
            <Router {...{ history: this.history }}>
                <Switch>
                    <Route exact path="/">
                        <TalksPage {...{ apiClient: this.apiClient }} />
                    </Route>
                    <Route exact path="/about">
                        <AboutPage />
                    </Route>
                </Switch>
            </Router>,
            this.rootElement,
        );
        // If you want your app to work offline and load faster, you can change
        // unregister() to register() below. Note this comes with some pitfalls.
        // Learn more about service workers: https://bit.ly/CRA-PWA
        serviceWorker.unregister();
    }
}
