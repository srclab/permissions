<?php

namespace SrcLab\Permissions\Repositories;

class Permission extends Repository
{
    /**
     * Модель.
     *
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model = \SrcLab\Permissions\Models\Permission::class;

    /**
     * Получение списка прав.
     *
     * @param null $search
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getPermissionsList($search = null)
    {
        $builder = $this->query();

        if(!empty($search)) {

            if(is_numeric($search)) {
                $builder->where('id', $search);
            } else {
                $builder->where(function ($query) use ($search) {
                    /** @var \Illuminate\Database\Query\Builder $query */
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            }

        }

        return $builder->paginate(20);
    }

}