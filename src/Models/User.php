<?php

namespace SrcLab\Permissions\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
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
     * Группа пользователя.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function group()
    {
        return $this->belongsTo(UserGroup::class, self::getUserGroupField());
    }

    /**
     * Получение группы пользователя
     *
     * @return integer
     */
    public function getGroupIdAttribute()
    {
        return $this->attributes[self::getUserGroupField()] ?? null;
    }

    /**
     * Установка группы пользователя.
     *
     * @param int $value
     */
    public function setGroupIdAttribute($value)
    {
        $this->{self::getUserGroupField()} = $value;
    }

    /**
     * Получение названия поля группы пользователя.
     *
     * @return string
     */
    public static function getUserGroupField()
    {
        return app_config('permissions.tables.relations.user_group_field');
    }

    /**
     * Получение списка прав доступа пользователя.
     *
     * @param bool $full
     * @return array
     */
    public function getPermissions($full = false)
    {
        $permissions = app(\SrcLab\Permissions\Repositories\UserPermission::class)->getUserPermissionsIds($this->id);

        /**
         * Вместе с правами группы.
         */
        if($full) {
            $permissions = array_unique(array_merge($permissions, $this->group->getPermissions()));
        }

        return \Arr::sort($permissions);
    }

}