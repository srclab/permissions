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

}
