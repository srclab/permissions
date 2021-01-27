<?php

if (!function_exists('app_config')) {

    /**
     * Get config data with country.
     *
     * @param array|string $key
     * @param mixed $default
     * @return mixed
     */
    function app_config($key = null, $default = null)
    {
        $country_code = strtolower(config('app.country', ''));

        if(empty($country_code)) {
            return config($key, $default);
        }

        return config("{$country_code}.{$key}", config($key, $default));
    }
}

if (!function_exists('get_custom_array_from_request')) {

    /**
     * Get custom array from request.
     *
     * @param array $data
     * @param string $field
     * @return mixed
     */
    function get_custom_array_from_request(array $data, $field)
    {
       $result = [];

        foreach ($data as $key => $value) {
            if(preg_match("/^(?:{$field})\[\d+\]$/i", $key)) {
                $result[] = $value;
            }
       }

       return $result;
    }
}