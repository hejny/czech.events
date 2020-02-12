import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { TalksPage } from './components/TalksPage';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Footer } from './components/Footer';
import { AboutPage } from './components/AboutPage';

const history = createBrowserHistory();

ReactDOM.render(
    <Router {...{ history }}>
        <Switch>
            <Route exact path="/">
                <TalksPage />
            </Route>
            <Route exact path="/about">
                <AboutPage />
            </Route>
        </Switch>
        <Footer />
    </Router>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
