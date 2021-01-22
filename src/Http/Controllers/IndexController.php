<?php

namespace SrcLab\Permissions\Http\Controllers;

use Illuminate\Http\Request;
use SrcLab\Permissions\Permissions;
use SrcLab\Permissions\Support\Response;

class IndexController extends Controller
{
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
}