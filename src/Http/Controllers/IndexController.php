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
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        return view('permissions::index');
    }
}