<?php

namespace SrcLab\Permissions;

use \SrcLab\Permissions\Repositories\User as UserRepository;
use SrcLab\Permissions\Support\Response;

class Users
{
    /**
     * @var UserRepository
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
     * Получение списка пользователей.
     *
     * @param array $filter
     * @return array
     */
    public function getUsers(array $filter = [])
    {
        $users = $this->user_repository->getUsersList($filter);

        return Response::success(null, compact('users'));
    }

    /**
     * Изменение прав и группы пользователя.
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
            return Response::error('Пользователь не найден.');
        }

        /**
         * Обновление прав с исключением из списка прав группы.
         */
        $permissions = array_diff($data['permissions'] ?? [], $user->group->getPermissions());

        app(\SrcLab\Permissions\Repositories\UserPermission::class)->updateUserPermissions($id, $permissions);

        /**
         * Обновление группы пользователя.
         */
        if($user->group_id != $data['group_id']) {
            $user->group_id = $data['group_id'];
            $user->update();
        }

        /**
         * Очистка кеша.
         * @var \Illuminate\Contracts\Cache\Repository $cache
         */
        $cache = app('cache');
        $cache->forget("user_permissions:{$id}");

        return Response::success('Пользователь изменен.');
    }

}