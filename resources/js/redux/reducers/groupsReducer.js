import Immutable from "immutable";
import {LOAD_GROUPS} from "../../constants/actionTypes";
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
 * GroupsReducer
 *
 * @param {Immutable.Map} state  - текущий state
 * @param {Object} action - текущий action
 * @return {Immutable.Map} - новый state
 */
export const groupsList = (state = immutableState, action) => {

    if (!action.main_type) {
        action.main_type = action.type;
    }

    switch (action.main_type) {

        case LOAD_GROUPS:
            return loadGroupsListHandler(state, action);

        default:
            return state;
    }

};

/**
 * Обработчик запроса получения списка групп.
 *
 * @param state
 * @param action
 * @returns {*}
 */
function loadGroupsListHandler(state, action) {

    switch (action.type) {
        case request_type(action.main_type):
            return state.set("fetching", true)
                .delete("loadGroupsListError")
                .delete("loadGroupsListValidation");
        case response_type(action.main_type):
            return state.delete("fetching")
                .set("groups", Immutable.fromJS(action.response.groups));
        case fail_type(action.main_type):
            return state.delete("fetching")
                .set("loadGroupsListError", Immutable.fromJS(action.error))
                .set("loadGroupsListValidation", Immutable.fromJS(action.validation));
        default:
            return state;
    }

}

