<?php

namespace SrcLab\Permissions\Repositories;

use SrcLab\Permissions\Models\User as UserModel;

class User extends Repository
{
    /**
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model = UserModel::class;

    /**
     * Get users list.
     *
     * @param array $filter
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getUsersList(array $filter = [])
    {
        $builder = $this->query()
            ->with('group');

        if(!empty($filter['search'])) {

            if(is_numeric($filter['search'])) {
                $builder->where('id', $filter['search']);
            } else {
                $builder->where('login', $filter['search']);
            }

        } else {
            $builder->whereNotIn(\SrcLab\Permissions\Models\User::getUserGroupField(), app_config('permissions.users_groups_without_permissions', []));
        }

        return $builder->get(['id', 'login', \SrcLab\Permissions\Models\User::getUserGroupField()]);
    }

    /**
     * Change user group.
     *
     * @param int $from
     * @param int $to
     */
    public function changeUsersGroup($from, $to)
    {
        $this->query()
            ->where(UserModel::getUserGroupField(), $from)
            ->update([UserModel::getUserGroupField() => $to]);
    }

}