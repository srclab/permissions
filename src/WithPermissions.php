<?php

namespace SrcLab\Permissions;

use SrcLab\Permissions\Models\User;

trait WithPermissions
{
    /**
     * Проверка доступа пользователя по системному имени правила.
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
     * Проверка доступа пользователя хотя бы по одному из правил массива.
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
     * Пользователь является супер юзером.
     *
     * @return bool
     */
    protected function isSuperUser()
    {
        return $this->{User::getUserGroupField()} == app_config('permissions.super_user_group_id');
    }
}