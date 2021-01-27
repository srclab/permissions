<?php

namespace SrcLab\Permissions\Repositories;

abstract class Repository
{
    /**
     * Модель.
     *
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model;

    /**
     * Получить Builder объект модели.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    protected function query()
    {
        return $this->model::query();
    }

    /**
     * Получить записи по первичному ключу.
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
     * Получить все записи.
     *
     * @param  array $columns
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function getAll($columns = ['*'])
    {
        return $this->query()->get($columns);
    }

}