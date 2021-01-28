<?php

use Illuminate\Support\Facades\Route;
use SrcLab\Permissions\Http\Controllers\GroupController;
use SrcLab\Permissions\Http\Controllers\IndexController;
use SrcLab\Permissions\Http\Controllers\PermissionController;
use SrcLab\Permissions\Http\Controllers\UserController;

Route::get('/', [IndexController::class, 'index'])->name('index');

Route::get('/permissions/ui_groups', [PermissionController::class, 'ui_groups'])->name('permissions.ui_groups');
Route::resource('permissions', 'PermissionController')->except(['create', 'edit']);

Route::get('/groups/parent_groups', [GroupController::class, 'parent_groups'])->name('permissions.parent_groups');
Route::resource('groups', 'GroupController')->except(['create', 'edit']);

Route::resource('users', 'UserController')->except(['create', 'edit', 'store', 'destroy']);