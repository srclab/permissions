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
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        return $this->returnJsonResult($this->base->getUsers($request->all()));
    }

    /**
     * Get user.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        return $this->returnJsonResult($this->base->getUser($id));
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
        $this->validate($request, [
            'group_id' => 'required|int',
        ]);

        $result = $this->base->editUser($id, $request->all());

        return $this->returnJsonResult($result);
    }

}