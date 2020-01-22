import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import redux_store  from './redux/stores/store';
import { Provider } from 'react-redux';

const root = document.getElementById('root')

//render mobx
// ReactDOM.render(
//     <Provider {...stores}>
//         <App />
//     </Provider>,
//     root
// );

//render redux
ReactDOM.render(
    <Provider store={redux_store}>
        <App />
    </Provider>,
    root
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
