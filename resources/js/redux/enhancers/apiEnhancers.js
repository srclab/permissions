import axios from 'axios';

import {
    request_type,
    response_type,
    fail_type,
} from '../../constants/apiConstants'

/**
 * Обработка action на необходимость запроса к АПИ и выполнение этих запросов
 */
export const apiMiddleware = store => next => action => {

    const {apiCall, isRestAPI, request, ...actualAction} = action;

    if (!apiCall) {
        return next(action)
    }

    store.dispatch({...actualAction, main_type: action.type, type: request_type(action.type)});

    axios({
        url: isRestAPI.host+(isRestAPI.method === 'get' && request ? '?'+(new URLSearchParams(request)).toString() : ''),
        method: isRestAPI.method,
        headers: {
            'Content-Type': 'application/json',
        },
        data: request
    }).then(response => {

        if (response.data.errors) {

            const {message, code, validation} = response.data.errors[0];

            if (code && code === 'not_auth') {
                window.location = '/';
            }

            if(validation) {
                store.dispatch({error: message, validation: validation, main_type: action.type, type: fail_type(action.type)});
            } else {
                store.dispatch({error: message, code: code, main_type: action.type, type: fail_type(action.type)});
            }

        } else {
            store.dispatch({response: response.data, main_type: action.type, type: response_type(action.type)});
        }

    }).catch(error => {
        store.dispatch({error: error.message, main_type: action.type, type: fail_type(action.type)})
    });

};