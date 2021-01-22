<?php

use Illuminate\Support\Facades\Route;
use SrcLab\Permissions\Http\Controllers\IndexController;
use SrcLab\Permissions\Http\Controllers\UserController;

Route::get('/', [IndexController::class, 'index'])->name('index');

Route::resource('permissions', 'PermissionController')->except(['show', 'create', 'edit']);
Route::resource('groups', 'GroupController')->except(['show', 'create', 'edit']);

Route::prefix('users')->name('users.')->group(function () {
    Route::get('/', [UserController::class, 'index'])->name('index');
    Route::get('/{id}', [UserController::class, 'edit'])->name('edit');
    Route::post('/{id}', [UserController::class, 'update'])->name('update');
});