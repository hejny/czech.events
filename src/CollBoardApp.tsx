import { createHashHistory, History } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import { ApiClient } from './api/ApiClient';
import * as serviceWorker from './serviceWorker';
import { RootComponent } from './components/RootComponent';
import uuid from 'uuid';
import { TouchController } from 'touchcontroller';
import { observe } from 'mobx';
import { BoardState } from './model/BoardState';
import { AppState } from './model/AppState';
import { MoveTool } from './tools/MoveTool';
import { DrawTool } from './tools/DrawTool';
import { EraseTool } from './tools/EraseTool';
import { DragTool } from './tools/DragTool';

// TODO: Join app and createApp
export class CollBoardApp {
    private appState: AppState;
    private boardState: BoardState;
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
        this.boardState = new BoardState();
        this.apiClient = new ApiClient(this.apiUrl);
        this.touchController = new TouchController([], window.document.body);

        this.setAppTitle();
        observe(this.boardState, this.setAppTitle.bind(this));

        this.initTools();

        ReactDOM.render(
            <Router {...{ history: this.history }}>
                <Switch>
                    <Route exact path="/">
                        <Redirect to={`/${uuid.v4()}`} />
                    </Route>
                    <Route exact path="/:boardId">
                        <RootComponent
                            {...{
                                appState: this.appState,
                                boardState: this.boardState,
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

    private initTools() {
        // TODO: refactor

        const moveTool = new MoveTool(this.appState, this.boardState, this.touchController);
        moveTool.setListeners();

        const drawTool = new DrawTool(this.appState, this.boardState, this.touchController);
        drawTool.setListeners();

        const eraseTool = new EraseTool(this.appState, this.boardState, this.touchController);
        eraseTool.setListeners();

        const dragTool = new DragTool(this.appState, this.boardState, this.touchController);
        dragTool.setListeners();
    }

    private setAppTitle() {
        // TODO: Some language/translate functions
        window.document.title = `${this.boardState.name} | CollBoard.com - Sdílená tabule ihned k použití.`;
    }
}
