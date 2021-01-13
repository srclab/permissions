<?php

namespace SrcLab\Permissions\Models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
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
}