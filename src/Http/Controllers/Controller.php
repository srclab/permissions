<?php

namespace SrcLab\Permissions\Http\Controllers;

use Illuminate\Foundation\Validation\ValidatesRequests;

abstract class Controller extends \Illuminate\Routing\Controller
{
    use ValidatesRequests;

    /**
     * Return success.
     *
     * @param string $message
     * @param array $data
     * @return \Illuminate\Http\JsonResponse
     */
    protected function returnSuccess($message, array $data = [])
    {
        return $this->returnJsonResult(array_merge([
            'operation_status' => [
                'status' => 'success',
                'message' => $message,
            ]
        ], $data));
    }

    /**
     * Return error.
     *
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    protected function returnError($message)
    {
        return $this->returnJsonResult([
            'operation_status' => [
                'status' => 'error',
                'message' => $message,
            ]
        ]);
    }

    /**
     * Return fson format result.
     *
     * @param array $result
     * @return \Illuminate\Http\JsonResponse
     */
    protected function returnJsonResult(array $result)
    {
        if (!empty($result['operation_status']['status']) && $result['operation_status']['status'] == 'error') {
            return response()->json($result)->setStatusCode(422);
        } else {
            return response()->json($result);
        }
    }
}