<?php

namespace SrcLab\Permissions\Models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    protected $fillable = ['id', 'name', 'description', 'ui_group'];

    /**
     * Permission constructor.
     *
     * @param array $attributes
     */
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->table = app_config('permissions.tables.permissions');
    }

    /**
     * Users list with permission.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany(User::class, app_config('permissions.tables.users_permissions'))
            ->select(['id', 'login', User::getUserGroupField()]);
    }

    /**
     * Groups list with permissions.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function groups()
    {
        return $this->belongsToMany(UserGroup::class, app_config('permissions.tables.users_groups_permissions'), 'permission_id', 'group_id');
    }

}