<?php

namespace SrcLab\Permissions\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

class UserGroup extends Model
{
    protected $fillable = ['parent_id', 'name', 'description'];

    /**
     * UserGroup constructor.
     *
     * @param array $attributes
     */
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->table = app_config('permissions.tables.users_groups');
    }

    //****************************************************************
    //************************* Отношения ****************************
    //****************************************************************

    /**
     * Родительская группа.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function parent()
    {
        return $this->hasOne(UserGroup::class, 'id', 'parent_id');
    }

    /**
     * Пользователи группы.
     *
     */
    public function users()
    {
        return $this->hasMany(User::class, User::getUserGroupField(), 'id');
    }

    /**
     * Права группы.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, app_config('permissions.tables.users_groups_permissions'), 'group_id', 'permission_id');
    }

    //****************************************************************
    //************************** Support *****************************
    //****************************************************************

    /**
     * Получение списка групп, запрещенных к изменению.
     *
     * @return array
     */
    public static function getBlockedGroups()
    {
        return app_config('permissions.blocked_group_ids', []);
    }

    /**
     * Получение списка прав группы.
     *
     * @return array
     */
    public function getPermissions()
    {
        $permissions = app(\SrcLab\Permissions\Repositories\UserGroupPermission::class)->getGroupPermissions($this->id);

        /**
         * Добавление прав родительской группы.
         */
        if($this->parent_id != 0) {
            $permissions = array_merge($permissions, $this->parent->getPermissions());
        }

        return Arr::sort(array_unique($permissions));
    }

}
