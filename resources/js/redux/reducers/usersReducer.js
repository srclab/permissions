import Immutable from "immutable";
import {LOAD_USER, LOAD_USERS, UPDATE_USER} from "../../constants/actionTypes";
import {queryHandler} from "./helpers";

/**
 * Init App State.
 *
 * @type {Immutable.Map}
 */
const immutableState = Immutable.Map({});

/**
 * UsersReducer.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map}
 */
export const usersList = (state = immutableState, action) => {

    if (!action.main_type) {
        action.main_type = action.type;
    }

    /**
     * Действия с запросами.
     */
    return queryHandler(state, action, (state, action) => {

        switch (action.main_type) {

            case LOAD_USER:
                return loadUserHandler(state, action);

            case LOAD_USERS:
                return loadUsersListHandler(state, action);

            case UPDATE_USER:
                return updateUserHandler(state, action);

            default:
                return state;
        }

    });

};

/**
 * Load users list handler.
 *
 * @param state
 * @param action
 * @returns {*}
 */
function loadUsersListHandler(state, action) {
    return state.set("users", Immutable.fromJS(action.response.users));
}

/**
 * Load user handler.
 *
 * @param state
 * @param action
 * @returns {*}
 */
function loadUserHandler(state, action) {
    return state.set('user', Immutable.fromJS(action.response.user));
}

/**
 * Update user handler.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map}
 */
function updateUserHandler(state, action) {
    return state.set(action.main_type, Immutable.fromJS({operation_status: action.response.operation_status}));
}
