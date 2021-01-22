import {
    CHANGE_PAGE,
    CLEAR_SEARCH,
    CREATE_PERMISSION,
    LOAD_GROUPS,
    LOAD_PERMISSIONS,
    LOAD_USERS
} from '../constants/actionTypes'
import {GET_API_URL} from "../constants/apiConstants";
import {
    CREATE_PERMISSION_ENDPOINT,
    GROUPS_ENDPOINT,
    PERMISSIONS_ENDPOINT,
    USERS_ENDPOINT
} from "../constants/routeConstants";

/**
 * Смена страницы.
 *
 * @param page
 * @param search
 */
export const changePage = (page, search) => ({
    type: CHANGE_PAGE,
    payload: {page, search}
});

/**
 * Очистка строки поиска.
 */
export const clearSearch = () => ({
    type: CLEAR_SEARCH,
});

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
 * Создание права.
 */
export const createPermission = (data) => ({
    type: CREATE_PERMISSION,
    apiCall: true,
    isRestAPI: {
        host: GET_API_URL(CREATE_PERMISSION_ENDPOINT),
        method: 'post',
    },
    payload: {data}
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