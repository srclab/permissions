<?php

namespace SrcLab\Permissions\Http\Controllers;

use Illuminate\Http\Request;
use SrcLab\Permissions\Groups;
use SrcLab\Permissions\Models\UserGroup;
use SrcLab\Permissions\Support\Response;

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
     * Get group.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        return $this->returnJsonResult($this->base->getGroup($id));
    }

    /**
     * Get parent groups list.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function parent_groups()
    {
        return $this->returnJsonResult(Response::success(null, [
            'parent_groups' => $this->base->group_repository->getAll(['id', 'name'])->pluck('name', 'id')->except(UserGroup::getParentBlockedGroups())->all(),
        ]));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'parent_id' => 'required|int|not_in:'.implode(',', UserGroup::getParentBlockedGroups()),
            'name' => 'required',
        ]);

        $result = $this->base->createGroup($request->all());

        return $this->returnJsonResult($result);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request, $id)
    {
        if(in_array($id, UserGroup::getBlockedGroups())) {
            return $this->returnJsonResult(Response::error(__('permissions::general.server.cant_update_group')));
        }

        $this->validate($request, [
            'parent_id' => 'required|int|not_in:'.implode(',', UserGroup::getParentBlockedGroups()),
            'name' => 'required',
        ]);

        $result = $this->base->editGroup($id, $request->all());

        return $this->returnJsonResult($result);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $result = $this->base->destroyGroup($id);

        return $this->returnJsonResult($result);
    }
    
}