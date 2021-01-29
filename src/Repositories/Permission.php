<?php

namespace SrcLab\Permissions\Repositories;

use Illuminate\Support\Facades\Cache;

class Permission extends Repository
{
    /**
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model = \SrcLab\Permissions\Models\Permission::class;

    /**
     * Get cached all permissions.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getAllPermissions()
    {
        return Cache::remember('permissions', 60*60*2, function () {
            return $this->query()->get(['id', 'name']);
        });
    }

    /**
     * Get permissions list.
     *
     * @param array $filter
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator|\Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getPermissionsList(array $filter = [])
    {
        $builder = $this->query()
            ->with([
                'groups',
                'users' => function($query) {
                    /** @var \Illuminate\Database\Query\Builder $query */
                    $query->limit(10);
                }
            ]);

        if(!empty($filter['search'])) {

            if(is_numeric($filter['search'])) {
                $builder->where('id', $filter['search']);
            } else {
                $builder->where(function ($query) use ($filter) {
                    /** @var \Illuminate\Database\Query\Builder $query */
                    $query->where('name', 'like', "%{$filter['search']}%")
                        ->orWhere('description', 'like', "%{$filter['search']}%");
                });
            }

        }

        return $builder->get();
    }

}