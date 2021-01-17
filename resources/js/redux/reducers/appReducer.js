import Immutable from "immutable";
import {CHANGE_PAGE, CLEAR_SEARCH} from "../../constants/actionTypes";

/**
 * Начальная инициализация App State
 *
 * @type {Immutable.Map}
 */
const immutableState = Immutable.Map({page: 'permissions'});

/**
 * AppReducer
 *
 * @param {Immutable.Map} state  - текущий state
 * @param {Object} action - текущий action
 * @return {Immutable.Map} - новый state
 */
export const app = (state = immutableState, action) => {

    if (!action.main_type) {
        action.main_type = action.type;
    }

    switch (action.main_type) {

        case CHANGE_PAGE:
            return changePageHandler(state, action);

        case CLEAR_SEARCH:
            return clearSearchHandler(state, action);

        default:
            return state;
    }

};

/**
 * Обработчик смены страницы.
 *
 * @param state
 * @param action
 * @returns {*}
 */
function changePageHandler(state, action) {
    return state.set('page', action.payload.page)
        .set('search', action.payload.search);
}

/**
 * Обработчик очистки строки поиска.
 *
 * @param state
 * @param action
 * @returns {*}
 */
function clearSearchHandler(state, action) {
    return state.delete('search');
}

