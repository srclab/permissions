<?php

namespace App\Services\Rule;

class Support
{
    /**
     * Нужно ли пропустить проверку файла.
     *
     * @param int $customer_id
     * @param int $executor_id
     * @return bool
     */
    public static function skipCheckingFile($customer_id, $executor_id)
    {
        $config = app_config('app_rules.addition.not_check_files_of_customers_and_executors');

        if (empty($config)) {
            return false;
        }

        foreach ($config as $value) {
            if ($customer_id == $value[0] && $executor_id == $value[1]) {
                return true;
            }
        }

        return false;
    }
}