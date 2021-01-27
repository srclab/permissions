import Immutable from "immutable";
import {
    CREATE_PERMISSION, DELETE_PERMISSION,
    LOAD_PERMISSION,
    LOAD_PERMISSIONS,
    LOAD_PERMISSIONS_UI_GROUPS,
    NODE_CLEAR, UPDATE_PERMISSION
} from "../../constants/actionTypes";
import {queryHandler} from "./helpers";

/**
 * Init App State
 *
 * @type {Immutable.Map}
 */
const immutableState = Immutable.Map({});

/**
 * PermissionsReducer
 *
 * @param {Immutable.Map} state 
 * @param {Object} action
 * @return {Immutable.Map}
 */
export const permissionsList = (state = immutableState, action) => {

    if (!action.main_type) {
        action.main_type = action.type;
    }

    /**
     * Store actions.
     */
    switch (action.main_type) {

        case NODE_CLEAR:
            return clearNodeHandler(state, action);

    }

    /**
     * API actions.
     */
    return queryHandler(state, action, (state, action) => {

        switch (action.main_type) {

            case LOAD_PERMISSIONS:
                return loadPermissionsListHandler(state, action);

            case LOAD_PERMISSION:
                return loadPermissionHandler(state, action);

            case LOAD_PERMISSIONS_UI_GROUPS:
                return loadPermissionsUiGroupsListHandler(state, action);

            case CREATE_PERMISSION:
                return createPermissionHandler(state, action);

            case UPDATE_PERMISSION:
                return updatePermissionHandler(state, action);

            case DELETE_PERMISSION:
                return deletePermissionHandler(state, action);

            default:
                return state;
        }

    });

};

/**
 * Load permissions list handler.
 *
 * @param state
 * @param action
 * @returns {*}
 */
function loadPermissionsListHandler(state, action) {
    return state.set('permissions', Immutable.fromJS(action.response.permissions));
}

/**
 * Load permission handler.
 *
 * @param state
 * @param action
 * @returns {*}
 */
function loadPermissionHandler(state, action) {
    return state.set('permission', Immutable.fromJS(action.response.permission));
}

/**
 * Load permissions ui groups list handler.
 *
 * @param state
 * @param action
 * @returns {*}
 */
function loadPermissionsUiGroupsListHandler(state, action) {
    return state.set('permissions_ui_groups', Immutable.fromJS(action.response.permissions_ui_groups));
}

/**
 * Create permission handler.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map}
 */
function createPermissionHandler(state, action) {
    return state.set(action.main_type, Immutable.fromJS({operation_status: action.response.operation_status}));
}

/**
 * Update permission handler.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map}
 */
function updatePermissionHandler(state, action) {
    return state.set(action.main_type, Immutable.fromJS({operation_status: action.response.operation_status}));
}

/**
 * Delete permission handler.
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map}
 */
function deletePermissionHandler(state, action) {
    return state.set(action.main_type, Immutable.fromJS({operation_status: action.response.operation_status}));
}

/**
 * Clear node handler.
 *
 * @param {Immutable.Map} state 
 * @param {Object} action
 * @return {Immutable.Map}
 */
function clearNodeHandler(state, action) {

    if (Array.isArray(action.payload.node)) {
        return state.deleteIn(action.payload.node);
    } else {
        return state.delete(action.payload.node);
    }

}
