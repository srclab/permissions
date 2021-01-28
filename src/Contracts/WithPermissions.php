<?php

namespace SrcLab\Permissions\Contracts;

/**
 * Interface WithPermissions
 *
 * @package SrcLab\Permissions\Contracts
 * @property int $id
 * @property \SrcLab\Permissions\Models\UserGroup $group
 */
interface WithPermissions
{
    /**
     * User group.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function group();

    /**
     * Get user permissions.
     *
     * @param bool $full
     * @return array
     */
    public function getPermissions($full = false);

    /**
     * Check user access by permission system name.
     *
     * @param null $system_name
     * @return bool
     */
    public function access($system_name = null);

    /**
     * Check user access a least one permission.
     *
     * @param array $system_names
     * @return bool
     */
    public function accessAtLeastOne(array $system_names);

    /**
     * User is super user.
     *
     * @return bool
     */
    public function isSuperUser();

}