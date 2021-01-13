<?php

namespace App\Http\Controllers\Web\Admin\Permissions;

use App\Base\Admin\Permission\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * @var \App\Base\Admin\Permission\User
     */
    private $base;

    /**
     * PermissionController constructor.
     *
     * @param \App\Base\Admin\Permission\User $base
     */
    public function __construct(User $base)
    {
        $this->middleware('admin_access:admin_permissions');

        $this->base = $base;
    }

    /**
     * Список пользователей.
     *
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(Request $request)
    {
        return view('admin.permission.users.index', [
            'data' => $this->base->user_repository->getUsersForPermissions($request->all()),
        ]);
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