import { createHashHistory, History } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import { ApiClient } from './api/ApiClient';
import * as serviceWorker from './serviceWorker';
import { RootComponent } from './components/RootComponent';
import { TouchController } from 'touchcontroller';
import { observe } from 'mobx';
import { ObjectVersionSystem } from './model/ObjectVersionSystem';
import { AppState } from './model/AppState';
import { MoveTool } from './tools/MoveTool';
import { DrawTool } from './tools/DrawTool';
import { EraseTool } from './tools/EraseTool';
import { DragTool } from './tools/DragTool';
import uuid from 'uuid';
import { idstring } from './utils/idstring';
import { ObjectVersionSystem } from './api/ObjectVersionSystem/ObjectVersionSystem';

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
                    <Route
                        exact
                        path="/:boardId"
                        render={({ match }) => {
                            const objectVersionSystem = this.connectToBoard(match.params.boardId);
                            return (
                                <RootComponent
                                    {...{
                                        appState: this.appState,
                                        objectVersionSystem,
                                        //apiClient: this.apiClient, // TODO: Is it nessesery to put here apiClient?
                                        touchController: this.touchController, // TODO: Is it nessesery to put here whole touchController not just function to propagate board element?
                                    }}
                                />
                            );
                        }}
                    />

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

    private connectToBoard(boardId: idstring): ObjectVersionSystem {
        const objectVersionSystem = new ObjectVersionSystem();

        this.apiClient.boardApiClient(boardId, objectVersionSystem);
        this.initTools(objectVersionSystem);

        /*
        TODO:
        const setAppTitle = () => {
            // TODO: Some language/translate functions
            window.document.title = `${objectVersionSystem.name} | CollBoard.com - Sdílená tabule ihned k použití.`;
        };
        setAppTitle();
        observe(objectVersionSystem, setAppTitle);
        */

        return objectVersionSystem;
    }

    private initTools(objectVersionSystem: ObjectVersionSystem) {
        // TODO: refactor

        const moveTool = new MoveTool(this.appState, objectVersionSystem, this.touchController);
        moveTool.setListeners();

        const drawTool = new DrawTool(this.appState, objectVersionSystem, this.touchController);
        drawTool.setListeners();

        const eraseTool = new EraseTool(this.appState, objectVersionSystem, this.touchController);
        eraseTool.setListeners();

        const dragTool = new DragTool(this.appState, objectVersionSystem, this.touchController);
        dragTool.setListeners();
    }
}
