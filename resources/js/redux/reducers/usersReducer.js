import Immutable from "immutable";
import {LOAD_USERS} from "../../constants/actionTypes";
import {fail_type, request_type, response_type} from "../../constants/apiConstants";

/**
 * Начальная инициализация App State
 *
 * @type {Immutable.Map}
 */
const immutableState = Immutable.Map({
    loading: true
});

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

    switch (action.main_type) {

        case LOAD_USERS:
            return loadUsersListHandler(state, action);

        default:
            return state;
    }

};

/**
 * Обработчик запроса получения списка пользователей.
 *
 * @param state
 * @param action
 * @returns {*}
 */
function loadUsersListHandler(state, action) {

    switch (action.type) {
        case request_type(action.main_type):
            return state.set("fetching", true)
                .delete("loadUsersListError")
                .delete("loadUsersListValidation");
        case response_type(action.main_type):
            return state.delete("fetching")
                .set("users", Immutable.fromJS(action.response.users));
        case fail_type(action.main_type):
            return state.delete("fetching")
                .set("loadUsersListError", Immutable.fromJS(action.error))
                .set("loadUsersListValidation", Immutable.fromJS(action.validation));
        default:
            return state;
    }

}

