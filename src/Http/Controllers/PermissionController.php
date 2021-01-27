<?php

namespace SrcLab\Permissions\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use SrcLab\Permissions\Permissions;
use SrcLab\Permissions\Support\Response;

class PermissionController extends Controller
{
    /**
     * @var \SrcLab\Permissions\Permissions
     */
    private $base;

    /**
     * PermissionController constructor.
     *
     * @param \SrcLab\Permissions\Permissions $base
     */
    public function __construct(Permissions $base)
    {
        $this->base = $base;
    }

    /**
     * Список прав.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        return $this->returnJsonResult($this->base->getPermissions($request->all()));
    }

    /**
     * Get permission.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        return $this->returnJsonResult($this->base->getPermission($id));
    }

    /**
     * Список UI групп прав.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function ui_groups()
    {
        return $this->returnJsonResult(Response::success(null, [
            'permissions_ui_groups' => app_config('permissions.permissions_groups', [])
        ]));
    }

    /**
     * Store permission.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|regex:/[a-z_]+/|unique:'.app_config('permissions.tables.permissions'),
            'description' => 'required',
            'ui_group' => 'required|int',
        ]);

        $result = $this->base->create($request->all());

        return $this->returnJsonResult($result);
    }

    /**
     * Update permission.
     *
     * @param int $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update($id, Request $request)
    {
        $this->validate($request, [
            'name' => [
                'required',
                'regex:/[a-z_]+/',
                Rule::unique(app_config('permissions.tables.permissions'))->ignore($id)
            ],
            'description' => 'required',
            'ui_group' => 'required|int',
        ]);

        $result = $this->base->update($id, $request->all());

        return $this->returnJsonResult($result);
    }

    /**
     * Destroy permission.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $result = $this->base->delete($id);

        return $this->returnJsonResult($result);
    }

}