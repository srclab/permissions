<?php

namespace SrcLab\Permissions;

use \SrcLab\Permissions\Repositories\User as UserRepository;
use SrcLab\Permissions\Support\Response;

class Users
{
    /**
     * @var \SrcLab\Permissions\Repositories\User
     */
    public $user_repository;

    /**
     * User constructor.
     *
     * @param UserRepository $user_repository
     */
    public function __construct(UserRepository $user_repository)
    {
        $this->user_repository = $user_repository;
    }

    /**
     * Get users list.
     *
     * @param array $filter
     * @return array
     */
    public function getUsers(array $filter = [])
    {
        $users = $this->user_repository->getUsersList($filter);

        /**
         * Get users permissions.
         * @var \SrcLab\Permissions\Models\User $user
         */
        $users_data = [];

        foreach ($users as $key => $user) {
            $users_data[$key] = $user->toArray();
            $users_data[$key]['permissions'] = app(\SrcLab\Permissions\Repositories\Permission::class)->getWhereIn('id', $user->getPermissions(true), ['id', 'name', 'description']);
        }

        return Response::success(null, [
            'users' => $users_data,
        ]);
    }

    /**
     * Get user.
     *
     * @param int $id
     * @return array
     */
    public function getUser($id)
    {
        /** @var \SrcLab\Permissions\Models\User $user */
        $user = $this->user_repository->find($id);

        if(empty($user)) {
            return Response::error(__('permissions::general.server.model_not_found'));
        }

        /**
         * Get user permissions.
         */
        $user_data = $user->only(['id', 'login', 'group_id']);
        $user_data['permissions'] = $user->getPermissions();
        $user_data['group_permissions'] = $user->group->getPermissions();

        return Response::success(null, [
            'user' => $user_data
        ]);
    }

    /**
     * Update user permissions and group.
     *
     * @param int $id
     * @param array $data
     * @return array
     */
    public function editUser($id, array $data)
    {
        /** @var \SrcLab\Permissions\Models\User $user */
        $user = app(\SrcLab\Permissions\Repositories\User::class)->find($id);

        if(empty($user)) {
            return Response::error(__('permissions::general.server.model_not_found'));
        }

        /**
         * Get permissions without group permissions.
         */
        $permissions = array_diff(get_custom_array_from_request($data, 'permissions'), $user->group->getPermissions());

        app(\SrcLab\Permissions\Repositories\UserPermission::class)->updateUserPermissions($id, $permissions);

        /**
         * Обновление группы пользователя.
         */
        if($user->group_id != $data['group_id']) {
            $user->group_id = $data['group_id'];
            $user->update();
        }

        /**
         * Clear cache.
         * @var \Illuminate\Contracts\Cache\Repository $cache
         */
        $cache = app('cache');
        $cache->forget("user_permissions:{$id}");

        return Response::success();
    }

}