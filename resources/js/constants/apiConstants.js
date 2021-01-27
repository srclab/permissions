/**
 * Получение полного action type запроса
 *
 * @param {string} type - action type
 * @return {string} - полный action type запроса
 */
export const request_type = type => `${type}_REQUEST`;

/**
 * Получение полного action type ответа
 *
 * @param {string} type - action type
 * @return {string} - полный action type ответа
 */
export const response_type = type => `${type}_RESPONSE`;

/**
 * Получение полного action type ошибки
 *
 * @param {string} type - action type
 * @return {string} - полный action type ошибки
 */
export const fail_type = type => `${type}_FAIL`;

/**
 * Получение полного action type выполнения запроса.
 *
 * @param {string} type
 * @return {string}
 */
export const fetching_type = type => `${type}_FETCHING`;

/**
 * Получение полного action type выполнения запроса.
 *
 * @param {string} type
 * @return {string}
 */
export const error_type = type => `${type}_ERROR`;

/**
 * Получение полного action type выполнения запроса.
 *
 * @param {string} type
 * @return {string}
 */
export const validation_type = type => `${type}_VALIDATION`;

/**
 * Получение url точки входа АПИ
 *
 * @param {string} endpoint - точка входа
 * @return {string} - url адрес api
 */
export const GET_API_URL = (endpoint) => {
    return document.querySelector('meta[name="base-path"]').content + endpoint;
};

