<?php

namespace SrcLab\Permissions\Models;

use Illuminate\Database\Eloquent\Model;

class UserGroupPermission extends Model
{
    /**
     * UserGroupPermission constructor.
     *
     * @param array $attributes
     */
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->table = app_config('permissions.tables.users_groups_permissions');
    }

    /**
     * Group.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function group()
    {
        return $this->belongsTo(UserGroup::class);
    }

}