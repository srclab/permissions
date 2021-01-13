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
}