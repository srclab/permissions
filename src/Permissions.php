<?php

namespace SrcLab\Permissions;

use SrcLab\Permissions\Contracts\WithPermissions;
use SrcLab\Permissions\Support\Response;

class Permissions
{
    /**
     * Проверка дополнительного права.
     *
     * @param int $id
     * @param string $rule_name
     * @return bool
     */
    public function checkAdditionRule($id, $rule_name)
    {
        //todo перенести дополнительные правила в конфиг разрешений
        return in_array($id, app_config('permissions.additions.'.$rule_name, []));
    }

    /**
     * Проверка прав доступа.
     *
     * @param WithPermissions $user
     * @param string $system_name
     * @return bool
     */
    public function checkRule(WithPermissions $user, $system_name)
    {
        $permissions = app_config('app_permissions.permissions');

        /**
         * Получение id требуемого разрешения.
         */
        $need_permission_id = 0;

        foreach ($permissions as $permission_id => $permission) {
            if($permission['name'] == $system_name) {
                $need_permission_id = $permission_id;
                break;
            }
        }

        if($need_permission_id == 0) {
            return false;
        }

        /**
         * Проверка в разрешениях группы.
         */
        if(in_array($need_permission_id, $user->group->getPermissions())) {
            return true;
        }

        /**
         * Проверка в разрешениях пользователя.
         */
        if(in_array($need_permission_id, $user->getPermissions())) {
            return true;
        }

        /** todo вынести на все сдал как расширение пакета
         * Проверка в разрешениях конкретного менеджера.
         */
        //if ($user->getGroupId() == 6) {
        //
        //    $managers_permissions = app_config('app_permissions.manager_permissions', []);
        //
        //    /* @var \App\Contracts\ManagerControl\ManagerControl $manager_control */
        //    $manager_control = app('app.manager_control');
        //    $manager_id = $manager_control->getCurrentManagerId();
        //
        //    if(!empty($managers_permissions[$manager_id]) && in_array($need_permission_id, $managers_permissions[$manager_id])) {
        //        return true;
        //    }
        //
        //}

        return false;
    }

    /**
     * Получение списка прав.
     *
     * @param array $filter
     * @return mixed
     */
    public function getPermissions(array $filter = [])
    {
        $permissions = app(\SrcLab\Permissions\Repositories\Permission::class)->getPermissionsList($filter);

        return Response::success(null, [
            'permissions' => $permissions
        ]);
    }

}