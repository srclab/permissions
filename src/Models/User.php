<?php

namespace SrcLab\Permissions\Models;

use Illuminate\Database\Eloquent\Model;
use SrcLab\Permissions\Contracts\WithPermissions;

class User extends Model implements WithPermissions
{
    use \SrcLab\Permissions\WithPermissions;

    public $timestamps = false;

    /**
     * User constructor.
     *
     * @param array $attributes
     */
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->table = app_config('permissions.tables.users');
    }

    /**
     * User group.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function group()
    {
        return $this->belongsTo(UserGroup::class, self::getUserGroupField());
    }

    /**
     * Get user group id attribute.
     *
     * @return integer
     */
    public function getGroupIdAttribute()
    {
        return $this->attributes[self::getUserGroupField()] ?? null;
    }

    /**
     * Set user group id attribute.
     *
     * @param int $value
     */
    public function setGroupIdAttribute($value)
    {
        $this->{self::getUserGroupField()} = $value;
    }

    /**
     * Get user group field name
     *
     * @return string
     */
    public static function getUserGroupField()
    {
        return app_config('permissions.tables.relations.user_group_field');
    }

}