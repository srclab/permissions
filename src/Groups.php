<?php

namespace SrcLab\Permissions;

use SrcLab\Permissions\Models\UserGroup;
use SrcLab\Permissions\Repositories\UserGroup as GroupRepository;
use SrcLab\Permissions\Support\Response;

class Groups
{
    /**
     * @var \SrcLab\Permissions\Repositories\UserGroup
     */
    public $group_repository;

    /**
     * Groups constructor.
     *
     * @param GroupRepository $group_repository
     */
    public function __construct(GroupRepository $group_repository)
    {
        $this->group_repository = $group_repository;
    }

    /**
     * Get group.
     *
     * @param int $id
     * @return array
     */
    public function getGroup($id)
    {
        /** @var \SrcLab\Permissions\Models\UserGroup $group */
        $group = $this->group_repository->find($id);

        if(empty($group)) {
            return Response::error(__('permissions::general.server.model_not_found'));
        }

        /**
         * Get group permissions.
         */
        $group_data = $group->getAttributes();
        $group_data['permissions'] = $group->getPermissions();
        $group_data['parent_permissions'] = !empty($group->parent) ? $group->parent->getPermissions() : [];

        return Response::success(null, [
            'group' => $group_data
        ]);
    }

    /**
     * Get groups list.
     *
     * @return array
     */
    public function getGroups()
    {
        $groups = $this->group_repository->getGroupsList();

        return Response::success(null, [
            'groups' => $groups,
        ]);
    }

    /**
     * Create group.
     *
     * @param array $data
     * @return array
     */
    public function createGroup(array $data)
    {
        $group = UserGroup::create($data);

        return Response::success('Группа создана.', [
            'id' => $group->id,
        ]);
    }

    /**
     * Update group.
     *
     * @param int $id
     * @param array $data
     * @return array
     */
    public function editGroup($id, array $data)
    {
        /** @var UserGroup $group */
        $group = $this->group_repository->find($id);

        if(empty($group)) {
            return Response::error('Группа не найдена.');
        }

        /**
         * Обновление прав с исключением из списка прав родительских групп.
         */
        $permissions = array_diff(get_custom_array_from_request($data, 'permissions'), $group->parent->getPermissions());

        app(\Srclab\Permissions\Repositories\UserGroupPermission::class)->updateGroupPermissions($id, $permissions);

        /**
         * Обновление группы.
         */
        $group->update($data);

        /**
         * Очистка кеша.
         * @var \Illuminate\Contracts\Cache\Repository $cache
         */
        $cache = app('cache');
        $cache->forget("user_group_permissions:{$id}");

        return Response::success('Группа изменена.');
    }

    /**
     * Destroy group.
     *
     * @param int $id
     * @return array
     * @throws \Throwable
     */
    public function destroyGroup($id)
    {
        if(in_array($id, UserGroup::getBlockedGroups())) {
            return Response::error('Удаление запрещено.');
        }

        /** @var UserGroup $group */
        $group = $this->group_repository->find($id);

        if(empty($group)) {
            return Response::error('Группа не найдена.');
        }

        /**
         * Проверка существования нижестоящих групп.
         */
        if($this->group_repository->existsChildren($id)) {
            return Response::error('Удаление невозможно. Группа имеет нижестоящие группы.');
        }

        try {

            \DB::beginTransaction();

            /**
             * Смена группы пользователей.
             */
            app(\SrcLab\Permissions\Repositories\User::class)->changeUsersGroup($id, 3);

            /**
             * Удаление связи прав группы.
             */
            app(\Srclab\Permissions\Repositories\UserGroupPermission::class)->deleteGroupPermissions($group->id);

            /**
             * Удаление группы.
             */
            $group->delete();

            \DB::commit();

        } catch (\Throwable $e) {
            \DB::rollBack();
            throw $e;
        }

        return Response::success('Группа удалена.');
    }

}