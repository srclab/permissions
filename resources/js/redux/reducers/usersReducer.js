import Immutable from "immutable";
import {LOAD_USERS} from "../../constants/actionTypes";
import {queryHandler} from "./helpers";

/**
 * Начальная инициализация App State
 *
 * @type {Immutable.Map}
 */
const immutableState = Immutable.Map({});

/**
 * UsersReducer
 *
 * @param {Immutable.Map} state  - текущий state
 * @param {Object} action - текущий action
 * @return {Immutable.Map} - новый state
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

            case LOAD_USERS:
                return loadUsersListHandler(state, action);

            default:
                return state;
        }

    });

};

/**
 * Обработчик запроса получения списка пользователей.
 *
 * @param state
 * @param action
 * @returns {*}
 */
function loadUsersListHandler(state, action) {
    return state.set("users", Immutable.fromJS(action.response.users));
}

