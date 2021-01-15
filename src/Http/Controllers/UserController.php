<?php

namespace SrcLab\Permissions\Http\Controllers;

use Illuminate\Http\Request;
use SrcLab\Permissions\Users;

class UserController extends Controller
{
    /**
     * @var \SrcLab\Permissions\Users
     */
    private $base;

    /**
     * PermissionController constructor.
     *
     * @param \SrcLab\Permissions\Users $base
     */
    public function __construct(Users $base)
    {
        $this->base = $base;
    }

    /**
     * Список пользователей.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        return $this->returnJsonResult($this->base->getUsers($request->all()));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function edit($id)
    {
        return view('admin.permission.users.edit', [
            'user' => $this->base->user_repository->get($id),
            'groups' => app(\App\Repositories\UserGroup::class)->getAll(['id', 'name'])->pluck('name', 'id')->toArray()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'group_id' => 'required|int',
            'permissions' => 'array|nullable',
        ]);

        $result = $this->base->editUser($id, $request->all());

        return $this->returnResult($result, function () {
            return [
                'route' => 'admin.permissions.users.index',
            ];
        });
    }

}