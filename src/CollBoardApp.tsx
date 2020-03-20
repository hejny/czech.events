import { createHashHistory, History } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Switch } from 'react-router-dom';
import { ApiClient } from './api/ApiClient';
import * as serviceWorker from './serviceWorker';
import { CollBoardComponent } from './components/CollBoardComponent';

// TODO: Join app and createApp
export class CollBoardApp {
    private apiClient: ApiClient;
    private history: History;

    constructor(private rootElement: HTMLDivElement, private apiUrl: string, private selfUrl: string) {
        console.log(`Starting CollBoardApp.`);
        console.log('rootElement', rootElement);
        console.log('apiUrl', apiUrl);
        console.log('selfUrl', selfUrl);
        this.run();
    }

    private async run() {
        this.history = createHashHistory();
        this.apiClient = new ApiClient(this.apiUrl);

        ReactDOM.render(
            <Router {...{ history: this.history }}>
                <Switch>
                    <Route exact path="/:boardId">
                        <CollBoardComponent {...{ apiClient: this.apiClient }} />
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
