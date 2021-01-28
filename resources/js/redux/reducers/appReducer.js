import Immutable from "immutable";
import {CHANGE_PAGE, CLEAR_PAGE} from "../../constants/actionTypes";

/**
 * Init App State.
 *
 * @type {Immutable.Map}
 */
const immutableState = Immutable.Map({page: 'permissions'});

/**
 * AppReducer.
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

        case CLEAR_PAGE:
            return clearPageHandler(state, action);

        default:
            return state;
    }

};

/**
 * Change page handler.
 *
 * @param {Immutable.Map} state
 * @param action
 * @returns {*}
 */
function changePageHandler(state, action) {
    return state.set('page', action.payload.page)
        .set('search', action.payload.search)
        .set('id', action.payload.id);
}

/**
 * Clear page handler.
 *
 * @param state
 * @param action
 * @returns {*}
 */
function clearPageHandler(state, action) {
    return state.delete('search')
        .delete('id');
}

