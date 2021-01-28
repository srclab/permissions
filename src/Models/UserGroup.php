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
     * Parent group.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function parent()
    {
        return $this->hasOne(UserGroup::class, 'id', 'parent_id');
    }

    /**
     * Group users.
     *
     */
    public function users()
    {
        return $this->hasMany(User::class, User::getUserGroupField(), 'id');
    }

    /**
     * Group permissions.
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
     * Get groups list that cant edit.
     *
     * @return array
     */
    public static function getBlockedGroups()
    {
        return app_config('permissions.blocked_group_ids', []);
    }

    /**
     * Get parent groups list that cant edit.
     *
     * @return array
     */
    public static function getParentBlockedGroups()
    {
        return app_config('permissions.blocked_parent_group_ids', []);
    }

    /**
     * Get group permissions list.
     *
     * @return array
     */
    public function getPermissions()
    {
        $permissions = app(\SrcLab\Permissions\Repositories\UserGroupPermission::class)->getGroupPermissionsIds($this->id);

        /**
         * Add parent group permissions.
         */
        if($this->parent_id != 0) {
            $permissions = array_merge($permissions, $this->parent->getPermissions());
        }

        return Arr::sort(array_unique($permissions));
    }

}
