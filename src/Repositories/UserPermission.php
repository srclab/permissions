<?php

namespace SrcLab\Permissions\Repositories;

class UserPermission extends Repository
{
    /**
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model = \SrcLab\Permissions\Models\UserPermission::class;

    /**
     * Get by permissions.
     *
     * @param array $permissions
     * @param array $with
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getByPermissions(array $permissions, $with = [])
    {
        return $this->query()
            ->with($with)
            ->whereIn('permission_id', $permissions)
            ->get();
    }

    /**
     * Get user ids by permission id.
     *
     * @param int $permission_id
     * @return array
     */
    public function getUserIdsByPermission($permission_id)
    {
        return $this->query()
            ->where('permission_id', $permission_id)
            ->pluck('user_id')
            ->toArray();
    }

    /**
     * Get user permissions ids.
     *
     * @param int $user_id
     * @return array
     */
    public function getUserPermissionsIds($user_id)
    {
        /* @var \Illuminate\Contracts\Cache\Repository $cache */
        $cache = app('cache');

        return $cache->remember("user_permissions:{$user_id}", 60*30, function () use ($user_id) {
            return $this->query()
                ->where('user_id', $user_id)
                ->pluck('permission_id')
                ->toArray();
        });
    }

    /**
     * Update user permissions.
     *
     * @param int $id
     * @param array $permissions
     */
    public function updateUserPermissions($id, array $permissions)
    {
        $base_builder = $this->query()->where('user_id', $id);

        if(empty($permissions)) {
            $this->query()->where('user_id', $id)->delete();
            return;
        }

        /**
         * Get current permissions.
         */
        $current_permissions = $base_builder->pluck('permission_id')->toArray();

        /**
         * Delete permissions.
         */
        $permissions_for_delete = array_diff($current_permissions, $permissions);

        if(!empty($permissions_for_delete)) {
            (clone $base_builder)->whereIn('permission_id', $permissions_for_delete)->delete();
        }

        /**
         * Add permissions.
         */
        $permissions_for_add = array_diff($permissions, $current_permissions);

        if(!empty($permissions_for_add)) {

            $permissions_for_add = array_map(function ($permission_id) use ($id) {
                return [
                    'user_id' => $id,
                    'permission_id' => $permission_id,
                ];
            }, $permissions_for_add);

            $this->query()->insert($permissions_for_add);
        }

    }

}
