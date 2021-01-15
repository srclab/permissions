import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './translations/i18n'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import Immutable from 'immutable'

/**
 * Получение начального Redux Store
 *
 * @type {{store: Store<any>, history}}
 */
const initialState = Immutable.Map();
const store = configureStore(initialState);

ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
    ), document.getElementById('root'));