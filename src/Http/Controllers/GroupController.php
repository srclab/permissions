<?php

namespace SrcLab\Permissions\Http\Controllers;

use Illuminate\Http\Request;
use SrcLab\Permissions\Groups;

class GroupController extends Controller
{
    /**
     * @var \SrcLab\Permissions\Groups
     */
    private $base;

    /**
     * PermissionController constructor.
     *
     * @param \SrcLab\Permissions\Groups $base
     */
    public function __construct(Groups $base)
    {
        $this->middleware('admin_access:admin_permissions');

        $this->base = $base;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return $this->returnJsonResult($this->base->getGroups());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        return view('admin.permission.groups.create', [
            'groups' => $this->base->group_repository->getAll(['id', 'name'])->pluck('name', 'id')->toArray()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'parent_id' => 'required|int|not_in:1,2,4,7',
            'name' => 'required',
        ]);

        $result = $this->base->createGroup($request->all());

        return $this->returnResult($result, function ($result) {
            return [
                'route' => 'admin.permissions.groups.edit',
                'route_parameters' => ['group' => $result['id']],
            ];
        });
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function edit($id)
    {
        if(in_array($id, \App\Models\UserGroup::$blocked_groups)) {
            return $this->returnResult(Response::error('Изменение этой группы запрещено'), function () {
                return [
                    'route' => 'admin.permissions.groups.index',
                ];
            });
        }

        return view('admin.permission.groups.edit', [
            'group' => $this->base->group_repository->get($id),
            'groups' => $this->base->group_repository->getAll(['id', 'name'])->pluck('name', 'id')->toArray()
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
        if(in_array($id, \App\Models\UserGroup::$blocked_groups)) {
            return $this->returnResult(Response::error('Изменение этой группы запрещено'), function () {
                return [
                    'route' => 'admin.permissions.groups.index',
                ];
            });
        }

        $this->validate($request, [
            'parent_id' => 'required|int|not_in:1,2,4,7',
            'name' => 'required',
            'permissions' => 'array|nullable',
        ]);

        $result = $this->base->editGroup($id, $request->all());

        return $this->returnResult($result, function () {
            return [
                'route' => 'admin.permissions.groups.index',
            ];
        });
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $result = $this->base->destroyGroup($id);

        return $this->returnResult($result, function () {
            return [
                'route' => 'admin.permissions.groups.index',
            ];
        });
    }
    
}