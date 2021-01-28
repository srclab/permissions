<?php

namespace SrcLab\Permissions;

use SrcLab\Permissions\Models\User;

trait WithPermissions
{
    /**
     * Check user access by permission system name.
     *
     * @param null $system_name
     * @return bool
     */
    public function access($system_name = null)
    {
        if (empty($system_name)) {
            return false;
        }

        if($this->isSuperUser()) {
            return true;
        }

        /* @var \SrcLab\Permissions\Contracts\WithPermissions $this */
        return app(Permissions::class)->checkRule($this, $system_name);
    }

    /**
     * Check user access a least one permission.
     *
     * @param array $system_names
     * @return bool
     */
    public function accessAtLeastOne(array $system_names)
    {
        if(empty($system_names)) {
            return false;
        }

        if($this->isSuperUser()) {
            return true;
        }

        $permissions = app(Permissions::class);

        foreach ($system_names as $system_name) {
            /* @var \SrcLab\Permissions\Contracts\WithPermissions $this */
            if($permissions->checkRule($this, $system_name)) {
                return true;
            }
        }

        return false;
    }

    /**
     * User is super user.
     *
     * @return bool
     */
    public function isSuperUser()
    {
        return $this->{User::getUserGroupField()} == app_config('permissions.super_user_group_id');
    }

    /**
     * Get user permissions list.
     *
     * @param bool $full
     * @return array
     */
    public function getPermissions($full = false)
    {
        $permissions = app(\SrcLab\Permissions\Repositories\UserPermission::class)->getUserPermissionsIds($this->id);

        /**
         * With group permissions.
         */
        if($full) {
            $permissions = array_unique(array_merge($permissions, $this->group->getPermissions()));
        }

        return \Arr::sort($permissions);
    }

}