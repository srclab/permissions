<?php

namespace SrcLab\Permissions\Repositories;

class User extends Repository
{
    /**
     * Модель.
     *
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model = \SrcLab\Permissions\Models\User::class;

    /**
     * Получение списка пользователей.
     *
     * @param array $filter
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getUsersList(array $filter = [])
    {
        $builder = $this->query()
            ->with('group');

        /**
         * Поиск по всем пользователям.
         */
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

}