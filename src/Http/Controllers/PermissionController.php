<?php

namespace SrcLab\Permissions\Http\Controllers;

use Illuminate\Http\Request;
use SrcLab\Permissions\Permissions;

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
     * Display a listing of the resource.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(Request $request)
    {
        return view('permissions::index');
    }

    /**
     * Список прав.
     *
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function permissions(Request $request)
    {
        return view('admin.permission.permissions', [
            'data' => $this->base->getPermissions($request->all()),
        ]);
    }

}