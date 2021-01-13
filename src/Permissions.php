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
        return app(\SrcLab\Permissions\Repositories\Permission::class)->getPermissionsList();

        // todo
        ///**
        // * Добавление групп и пользователей, которые имеют эти права.
        // */
        //$groups_permissions = app(\App\Repositories\UserGroupPermission::class)->getByPermissions(array_keys($permissions), ['group'])->groupBy('permission_id');
        //$users_permissions = app(\App\Repositories\UserPermission::class)->getByPermissions(array_keys($permissions), ['user'])->groupBy('permission_id');
        //
        //foreach ($permissions as $permission_id => &$permission) {
        //
        //    $permission_groups = $groups_permissions->get($permission_id);
        //    $permission_users = $users_permissions->get($permission_id);
        //
        //    $permission['groups'] = empty($permission_groups) || $permission_groups->isEmpty() ? $permission_groups : $permission_groups->pluck('group')->filter();
        //    $permission['users'] = empty($permission_users) || $permission_users->isEmpty() ? $permission_users : $permission_users->pluck('user')->filter();
        //
        //}
        //
        //return $permissions;
    }

    /**
     * Изменение прав и группы пользователя.
     *
     * @param int $id
     * @param array $data
     * @return array
     */
    public function editUserPermissions($id, array $data)
    {
        /** @var \SrcLab\Permissions\Models\User $user */
        $user = app(\SrcLab\Permissions\Repositories\User::class)->find($id);

        if(empty($user)) {
            return Response::error('Пользователь не найден.');
        }

        /**
         * Обновление прав с исключением из списка прав группы.
         */
        $permissions = array_diff($data['permissions'] ?? [], $user->group->getPermissions());

        app(\SrcLab\Permissions\Repositories\UserPermission::class)->updateUserPermissions($id, $permissions);

        /**
         * Обновление группы пользователя.
         */
        if($user->group_id != $data['group_id']) {
            $user->group_id = $data['group_id'];
            $user->update();
        }

        /**
         * Очистка кеша.
         * @var \Illuminate\Contracts\Cache\Repository $cache
         */
        $cache = app('cache');
        $cache->forget("user_permissions:{$id}");

        return Response::success('Пользователь изменен.');
    }

}