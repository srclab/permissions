<?php

namespace SrcLab\Permissions\Http\Controllers;

use Illuminate\Http\Request;
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

}