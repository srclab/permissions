<?php

namespace SrcLab\Permissions;

use SrcLab\Permissions\Contracts\WithPermissions;
use SrcLab\Permissions\Models\Permission;
use SrcLab\Permissions\Support\Response;

class Permissions
{
    /**
     * Check additional rule.
     *
     * @param int $id
     * @param string $rule_name
     * @return bool
     */
    public function checkAdditionRule($id, $rule_name)
    {
        return in_array($id, app_config('permissions.additions.'.$rule_name, []));
    }

    /**
     * Check rule.
     *
     * @param WithPermissions $user
     * @param string $system_name
     * @return bool
     */
    public function checkRule(WithPermissions $user, $system_name)
    {
        $permissions = app_config('app_permissions.permissions');

        /**
         * Get permission id.
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
         * Check in group permissions.
         */
        if(in_array($need_permission_id, $user->group->getPermissions())) {
            return true;
        }

        /**
         * Check in user permissions.
         */
        if(in_array($need_permission_id, $user->getPermissions())) {
            return true;
        }

        return false;
    }

    /**
     * Get permissions list.
     *
     * @param array $filter
     * @return array
     */
    public function getPermissions(array $filter = [])
    {
        $permissions = app(\SrcLab\Permissions\Repositories\Permission::class)->getPermissionsList($filter);

        return Response::success(null, [
            'permissions' => $permissions
        ]);
    }

    /**
     * Get permission.
     *
     * @param int $id
     * @return array
     */
    public function getPermission($id)
    {
        $permission = app(\SrcLab\Permissions\Repositories\Permission::class)->find($id);

        if(empty($permission)) {
            return Response::error(__('permissions::general.server.model_not_found'));
        }

        return Response::success(null, [
            'permission' => $permission
        ]);
    }

    /**
     * Create permission.
     *
     * @param array $data
     * @return array
     */
    public function create(array $data)
    {
        Permission::create($data);

        return Response::success();
    }

    /**
     * Update permission.
     *
     * @param int $id
     * @param array $data
     * @return array
     */
    public function update($id, array $data)
    {
        $permission = Permission::find($id);

        if(empty($permission)) {
            return Response::error(__('permissions::general.server.model_not_found'));
        }

        $permission->update($data);

        return Response::success();
    }

    /**
     * Delete permission.
     *
     * @param int $id
     * @return array
     */
    public function delete($id)
    {
        $permission = Permission::find($id);

        if(empty($permission)) {
            return Response::error(__('permissions::general.server.model_not_found'));
        }

        $permission->delete();

        return Response::success();
    }

}