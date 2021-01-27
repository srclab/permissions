<?php

namespace SrcLab\Permissions\Repositories;

class UserGroup extends Repository
{
    /**
     * Модель.
     *
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model = \SrcLab\Permissions\Models\UserGroup::class;

    /**
     * Проверка наличия нижестоящих групп.
     *
     * @param int $id
     * @return bool
     */
    public function existsChildren($id)
    {
        return $this->query()
            ->where('parent_id', $id)
            ->exists();
    }

    /**
     * Получение списка групп.
     *
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getGroupsList()
    {
        return $this->query()
            ->with([
                'users' => function($query) {
                    /** @var \Illuminate\Database\Query\Builder $query */
                    $query->limit(15);
                },
                'permissions',
                'parent.permissions'
            ])
            ->get();
    }

}
