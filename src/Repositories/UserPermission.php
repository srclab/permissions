<?php

namespace SrcLab\Permissions\Repositories;

class UserPermission extends Repository
{
    /**
     * Модель.
     *
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model = \SrcLab\Permissions\Models\UserPermission::class;

    /**
     * Получение записей по правам
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
     * Получение списка id пользователей по id права.
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
     * Получение списка прав пользователя.
     *
     * @param int $user_id
     * @return array
     */
    public function getUserPermissions($user_id)
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
     * Обновление прав группы.
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
                    'user_id' => $id,
                    'permission_id' => $permission_id,
                ];
            }, $permissions_for_add);

            $this->query()->insert($permissions_for_add);
        }

    }

}
