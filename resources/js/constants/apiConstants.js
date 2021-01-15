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
 * Получение url точки входа АПИ
 *
 * @param {string} endpoint - точка входа
 * @return {string} - url адрес api
 */
export const GET_API_URL = (endpoint) => {
    return document.querySelector('meta[name="base-path"]').content + endpoint;
};

