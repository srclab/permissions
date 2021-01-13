<?php

namespace SrcLab\Permissions\Contracts;

/**
 * Interface WithPermissions
 *
 * @package SrcLab\Permissions\Contracts
 * @property \SrcLab\Permissions\Models\UserGroup $group
 */
interface WithPermissions
{
    /**
     * Группа пользователя.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function group();

    /**
     * Получение списка прав доступа пользователя.
     *
     * @param bool $full
     * @return array
     */
    public function getPermissions($full = false);

    /**
     * Получение идентификатора группы пользователя.
     *
     * @return int
     */
    public function getGroupId();

}