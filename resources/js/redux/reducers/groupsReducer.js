import Immutable from "immutable";
import {
    CREATE_GROUP, DELETE_GROUP,
    LOAD_GROUPS, LOAD_GROUP, UPDATE_GROUP, LOAD_PARENT_GROUPS,
} from "../../constants/actionTypes";
import {queryHandler} from "./helpers";

/**
 * Начальная инициализация App State
 *
 * @type {Immutable.Map}
 */
const immutableState = Immutable.Map({});

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

    /**
     * Действия с запросами.
     */
    return queryHandler(state, action, (state, action) => {

        switch (action.main_type) {

            case LOAD_GROUPS:
                return loadGroupsListHandler(state, action);

            case LOAD_PARENT_GROUPS:
                return loadParentGroupsListHandler(state, action);

            case LOAD_GROUP:
                return loadGroupHandler(state, action);

            case CREATE_GROUP:
                return createGroupHandler(state, action);

            case UPDATE_GROUP:
                return updateGroupHandler(state, action);

            case DELETE_GROUP:
                return deleteGroupHandler(state, action);

            default:
                return state;
        }

    });

};

/**
 * Load groups handler.
 *
 * @param state
 * @param action
 * @returns {*}
 */
function loadGroupsListHandler(state, action) {
    return state.set('groups', Immutable.fromJS(action.response.groups));
}

/**
 * Load parent groups handler.
 *
 * @param state
 * @param action
 * @returns {*}
 */
function loadParentGroupsListHandler(state, action) {
    return state.set('parent_groups', Immutable.fromJS(action.response.parent_groups));
}

/**
 * Load group handler.
 *
 * @param state
 * @param action
 * @returns {*}
 */
function loadGroupHandler(state, action) {
    return state.set('group', Immutable.fromJS(action.response.group));
}

/**
 * Create group handler.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map}
 */
function createGroupHandler(state, action) {
    return state.set(action.main_type, Immutable.fromJS({operation_status: action.response.operation_status}));
}

/**
 * Update group handler.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map}
 */
function updateGroupHandler(state, action) {
    return state.set(action.main_type, Immutable.fromJS({operation_status: action.response.operation_status}));
}

/**
 * Delete group handler.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map}
 */
function deleteGroupHandler(state, action) {
    return state.set(action.main_type, Immutable.fromJS({operation_status: action.response.operation_status}));
}
