import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import configureStore from './store';
import Router from './router';
import reportWebVitals from './reportWebVitals';
import '@blueprintjs/core/lib/css/blueprint.css';

// const store = configureStore();

ReactDOM.render(
    <React.StrictMode>
        {/* <Provider store={store}> */}
            <Router />
        {/* </Provider> */}
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
