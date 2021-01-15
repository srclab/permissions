import {LOAD_GROUPS, LOAD_PERMISSIONS, LOAD_USERS} from '../constants/actionTypes'
import {GET_API_URL} from "../constants/apiConstants";
import {GROUPS_ENDPOINT, PERMISSIONS_ENDPOINT, USERS_ENDPOINT} from "../constants/routeConstants";

/**
 * Загрузка списка прав.
 *
 * @param search
 */
export const loadPermissions = (search) => ({
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
 * Загрузка списка групп.
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
 * Загрузка списка пользователей.
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