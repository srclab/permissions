import {
    CHANGE_PAGE,
    CLEAR_PAGE, CREATE_GROUP,
    CREATE_PERMISSION, DELETE_GROUP, DELETE_PERMISSION, LOAD_GROUP,
    LOAD_GROUPS, LOAD_PARENT_GROUPS, LOAD_PERMISSION,
    LOAD_PERMISSIONS, LOAD_PERMISSIONS_UI_GROUPS,
    LOAD_USERS, NODE_CLEAR, UPDATE_GROUP, UPDATE_PERMISSION
} from '../constants/actionTypes'
import {GET_API_URL} from "../constants/apiConstants";
import {
    CREATE_PERMISSION_ENDPOINT,
    GROUPS_ENDPOINT, PARENT_GROUPS_ENDPOINT,
    PERMISSIONS_ENDPOINT, PERMISSIONS_UI_GROUPS_ENDPOINT,
    USERS_ENDPOINT
} from "../constants/routeConstants";

/**
 * Change page.
 *
 * @param page
 * @param search
 * @param id
 */
export const changePage = (page, search, id) => ({
    type: CHANGE_PAGE,
    payload: {page, search, id}
});

/**
 * Clear page.
 */
export const clearPage = () => ({
    type: CLEAR_PAGE,
});

/**
 * Load permissions list.
 *
 * @param search
 */
export const loadPermissions = (search = '') => ({
    type: LOAD_PERMISSIONS,
    apiCall: true,
    isRestAPI: {
        host: GET_API_URL(PERMISSIONS_ENDPOINT),
        method: 'get',
    },
    request: {
        search: search
    }
});

/**
 * Load permission model.
 *
 * @param id
 */
export const loadPermission = (id) => ({
    type: LOAD_PERMISSION,
    apiCall: true,
    isRestAPI: {
        host: GET_API_URL(PERMISSIONS_ENDPOINT)+'/'+id,
        method: 'get',
    },
});

/**
 * Load permissions ui groups.
 */
export const loadPermissionsUiGroups = () => ({
    type: LOAD_PERMISSIONS_UI_GROUPS,
    apiCall: true,
    isRestAPI: {
        host: GET_API_URL(PERMISSIONS_UI_GROUPS_ENDPOINT),
        method: 'get',
    },
});

/**
 * Create permission.
 */
export const createPermission = (data) => ({
    type: CREATE_PERMISSION,
    apiCall: true,
    isRestAPI: {
        host: GET_API_URL(PERMISSIONS_ENDPOINT),
        method: 'post',
    },
    request: {...data}
});

/**
 * Update permission.
 */
export const updatePermission = (data) => ({
    type: UPDATE_PERMISSION,
    apiCall: true,
    isRestAPI: {
        host: GET_API_URL(PERMISSIONS_ENDPOINT)+'/'+data.id,
        method: 'PUT',
    },
    request: {...data}
});

/**
 * Delete permission.
 */
export const deletePermission = (id) => ({
    type: DELETE_PERMISSION,
    apiCall: true,
    isRestAPI: {
        host: GET_API_URL(PERMISSIONS_ENDPOINT)+'/'+id,
        method: 'DELETE',
    }
});

/**
 * Load permissions groups.
 */
export const loadGroups = () => ({
    type: LOAD_GROUPS,
    apiCall: true,
    isRestAPI: {
        host: GET_API_URL(GROUPS_ENDPOINT),
        method: 'get',
    },
});

/**
 * Load parent groups.
 */
export const loadParentGroups = () => ({
    type: LOAD_PARENT_GROUPS,
    apiCall: true,
    isRestAPI: {
        host: GET_API_URL(PARENT_GROUPS_ENDPOINT),
        method: 'get',
    },
});

/**
 * Load permissions group model.
 *
 * @param id
 */
export const loadGroup = (id) => ({
    type: LOAD_GROUP,
    apiCall: true,
    isRestAPI: {
        host: GET_API_URL(GROUPS_ENDPOINT)+'/'+id,
        method: 'get',
    },
});

/**
 * Create group.
 */
export const createGroup = (data) => ({
    type: CREATE_GROUP,
    apiCall: true,
    isRestAPI: {
        host: GET_API_URL(GROUPS_ENDPOINT),
        method: 'post',
    },
    request: {...data}
});

/**
 * Update group.
 */
export const updateGroup = (id, data) => ({
    type: UPDATE_GROUP,
    apiCall: true,
    isRestAPI: {
        host: GET_API_URL(GROUPS_ENDPOINT)+'/'+id,
        method: 'PUT',
    },
    request: data
});

/**
 * Delete group.
 */
export const deleteGroup = (id) => ({
    type: DELETE_GROUP,
    apiCall: true,
    isRestAPI: {
        host: GET_API_URL(GROUPS_ENDPOINT)+'/'+id,
        method: 'DELETE',
    }
});

/**
 * Load users list.
 *
 * @param search
 */
export const loadUsers = (search) => ({
    type: LOAD_USERS,
    apiCall: true,
    isRestAPI: {
        host: GET_API_URL(USERS_ENDPOINT),
        method: 'get',
    },
    request: {
        search: search
    }
});

/**
 * Clear node.
 *
 * @param {string} node
 * @return {{type: string, payload: {node: string}}}
 */
export function nodeClear(node) {
    return {
        type: NODE_CLEAR,
        payload: {node}
    }
}