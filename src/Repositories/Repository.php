<?php

namespace SrcLab\Permissions\Repositories;

abstract class Repository
{
    /**
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model;

    /**
     * Get query.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    protected function query()
    {
        return $this->model::query();
    }

    /**
     * Find model by id.
     *
     * @param mixed $id
     * @param array $columns
     * @param array $with
     * @return \Illuminate\Database\Eloquent\Model|\Illuminate\Database\Eloquent\Collection|static|null
     */
    public function find($id, $columns = ['*'], $with = [])
    {
        return $this->query()->with($with)->find($id, $columns);
    }

    /**
     * Get all records.
     *
     * @param  array $columns
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function getAll($columns = ['*'])
    {
        return $this->query()->get($columns);
    }

    /**
     * Get where in records.
     *
     * @param string $column
     * @param mixed $values
     * @param array|string[] $columns
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getWhereIn($column, $values, array $columns = ['*'])
    {
        return $this->query()->whereIn($column, $values)->get($columns);
    }

}