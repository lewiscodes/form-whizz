import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../App';
import Nav from '../components/nav';
import ConfigPage from '../pages/config';

export enum ERoutes {
    DASHBOARD = '/',
    CONFIG = '/config'
}

const AppRouter = () => {
    const testErrorHandling = async () => {
        const res = await (await fetch('/formTemplate/ba0cfc6a-9b4c-46d6-93b4-509148a2a526', { method: 'DELETE' })).json();
        console.log(res); //eslint-disable-line
    }

    useEffect(() => {
        testErrorHandling();
    }, []);

    return (
        <Router>
            <Nav />
            <Switch>
                <Route path={ERoutes.CONFIG} component={ConfigPage} />
                <Route path={ERoutes.DASHBOARD} component={App} />
            </Switch>
        </Router>
    );
}

export default AppRouter;
