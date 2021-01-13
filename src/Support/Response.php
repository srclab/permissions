<?php

namespace SrcLab\Permissions\Support;

class Response
{
    /**
     * Формирование ответа об успешной операции.
     *
     * @param string $message
     * @param array $parameters
     * @param int $code
     * @return array
     */
    public static function success($message = NULL, array $parameters = [], $code = NULL)
    {
        $message = $message ?? __('api.operation_success');
        $code = $code ?? NULL;

        return array_merge([
            'operation_status' => [
                'status' => 'success',
                'message' => $message,
                'code' => $code,
            ],
        ], $parameters);
    }

    /**
     * Формирование ответа об ошибке операции.
     *
     * @param string $message
     * @param array $parameters
     * @param int $code
     * @return array
     */
    public static function error($message = NULL, array $parameters = [], $code = NULL)
    {
        $message = $message ?? __('api.operation_error');
        $code = $code ?? NULL;

        return array_merge([
            'operation_status' => [
                'status' => 'error',
                'message' => $message,
                'code' => $code,
            ],
        ], $parameters);
    }

}