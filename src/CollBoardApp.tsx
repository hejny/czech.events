import { createHashHistory, History } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import { ApiClient } from './api/ApiClient';
import * as serviceWorker from './serviceWorker';
import { CollBoardComponent } from './components/CollBoardComponent';
import uuid from 'uuid';
import { TouchController } from 'touchcontroller';
import { AppState } from './model/AppState';

// TODO: Join app and createApp
export class CollBoardApp {
    private appState: AppState;
    private apiClient: ApiClient;
    private history: History;
    private touchController: TouchController;

    constructor(private rootElement: HTMLDivElement, private apiUrl: string, private selfUrl: string) {
        console.info(`Starting CollBoardApp.`);
        console.info('rootElement', rootElement);
        console.info('apiUrl', apiUrl);
        console.info('selfUrl', selfUrl);
        this.run();
    }

    private async run() {
        this.history = createHashHistory();
        this.appState = new AppState();
        this.apiClient = new ApiClient(this.apiUrl);
        this.touchController = new TouchController([], window.document.body);

        ReactDOM.render(
            <Router {...{ history: this.history }}>
                <Switch>
                    <Route exact path="/">
                        <Redirect to={`/${uuid.v4()}`} />
                    </Route>
                    <Route exact path="/:boardId">
                        <CollBoardComponent
                            {...{
                                appState: this.appState,
                                apiClient: this.apiClient,
                                touchController: this.touchController,
                            }}
                        />
                    </Route>
                    <Route path="*">Not found</Route>
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
