<?php

namespace SrcLab\Permissions\Models;

use Illuminate\Database\Eloquent\Model;

class UserPermission extends Model
{
    /**
     * UserPermission constructor.
     *
     * @param array $attributes
     */
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->table = app_config('permissions.tables.users_permissions');
    }

    /**
     * User.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
