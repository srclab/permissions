<?php

namespace SrcLab\Permissions\Repositories;

use Illuminate\Database\Query\Builder;

class UserGroupPermission extends Repository
{
    /**
     * @var \Illuminate\Contracts\Cache\Repository
     */
    protected $cache;

    /**
     * Модель.
     *
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model = \SrcLab\Permissions\Models\UserGroupPermission::class;

    /**
     * UserProfile constructor.
     */
    public function __construct()
    {
        $this->cache = app('cache');
    }

    /**
     * Получение записей по правам.
     *
     * @param array $permissions
     * @param array $with
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getByPermissions(array $permissions, array $with = [])
    {
        return $this->query()
            ->with($with)
            ->whereIn('permission_id', $permissions)
            ->get();
    }

    /**
     * Получение списка прав группы.
     *
     * @param int $group_id
     * @return array
     */
    public function getGroupPermissions($group_id)
    {
        return $this->cache->remember("user_group_permissions:{$group_id}", 60 * 60 * 3, function () use ($group_id) {
            return $this->query()
                ->where('group_id', $group_id)
                ->pluck('permission_id')
                ->toArray();
        });
    }

    /**
     * Получение списка id пользователей по id права.
     *
     * @param int $permission_id
     * @param array $exclude_groups
     * @return array
     */
    public function getUserIdsByPermission($permission_id, $exclude_groups = [])
    {
        return app(User::class)->query()
            ->whereIn(\SrcLab\Permissions\Models\User::getUserGroupField(), function ($query) use ($permission_id, $exclude_groups) {
                /** @var Builder $query */
                $query->select(['group_id'])
                    ->from('users_groups_permissions')
                    ->where('permission_id', $permission_id)
                    ->whereNotIn('group_id', $exclude_groups);
            })
            ->pluck('id')
            ->toArray();
    }

    /**
     * Удаление прав группы.
     *
     * @param int $id
     */
    public function deleteGroupPermissions($id)
    {
        $this->query()
            ->where('group_id', $id)
            ->delete();
    }

    /**
     * Обновление прав группы.
     *
     * @param int $id
     * @param array $permissions
     */
    public function updateGroupPermissions($id, array $permissions)
    {
        $base_builder = $this->query()->where('group_id', $id);

        if(empty($permissions)) {
            $this->query()->where('group_id', $id)->delete();
            return;
        }

        /**
         * Получение текущего списка прав.
         */
        $current_permissions = $base_builder->pluck('permission_id')->toArray();

        /**
         * Удаление прав.
         */
        $permissions_for_delete = array_diff($current_permissions, $permissions);

        if(!empty($permissions_for_delete)) {
            (clone $base_builder)->whereIn('permission_id', $permissions_for_delete)->delete();
        }

        /**
         * Добавление прав.
         */
        $permissions_for_add = array_diff($permissions, $current_permissions);

        if(!empty($permissions_for_add)) {

            $permissions_for_add = array_map(function ($permission_id) use ($id) {
                return [
                    'group_id' => $id,
                    'permission_id' => $permission_id,
                ];
            }, $permissions_for_add);

            $this->query()->insert($permissions_for_add);
        }

    }

}
