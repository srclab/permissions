import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './translations/i18n'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import Immutable from 'immutable'

ReactDOM.render((
    <Provider store={configureStore(Immutable.Map())}>
        <App/>
    </Provider>
    ), document.getElementById('root'));