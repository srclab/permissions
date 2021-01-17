import Immutable from "immutable";
import {LOAD_PERMISSIONS} from "../../constants/actionTypes";
import {fail_type, request_type, response_type} from "../../constants/apiConstants";

/**
 * Начальная инициализация App State
 *
 * @type {Immutable.Map}
 */
const immutableState = Immutable.Map({});

/**
 * PermissionsReducer
 *
 * @param {Immutable.Map} state  - текущий state
 * @param {Object} action - текущий action
 * @return {Immutable.Map} - новый state
 */
export const permissionsList = (state = immutableState, action) => {

    if (!action.main_type) {
        action.main_type = action.type;
    }

    switch (action.main_type) {

        case LOAD_PERMISSIONS:
            return loadPermissionsListHandler(state, action);

        default:
            return state;
    }

};

/**
 * Обработчик запроса получения списка прав.
 *
 * @param state
 * @param action
 * @returns {*}
 */
function loadPermissionsListHandler(state, action) {

    switch (action.type) {
        case request_type(action.main_type):
            return state.set("fetching", true)
                .delete("loadPermissionsListError")
                .delete("loadPermissionsListValidation");
        case response_type(action.main_type):
            return state.delete("fetching")
                .set("permissions", Immutable.fromJS(action.response.permissions));
        case fail_type(action.main_type):
            return state.delete("fetching")
                .set("loadPermissionsListError", Immutable.fromJS(action.error))
                .set("loadPermissionsListValidation", Immutable.fromJS(action.validation));
        default:
            return state;
    }

}

