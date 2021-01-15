<?php

use Illuminate\Support\Facades\Route;
use SrcLab\Permissions\Http\Controllers\PermissionController;
use SrcLab\Permissions\Http\Controllers\UserController;

Route::get('/', [PermissionController::class, 'index'])->name('index');
Route::get('/permissions', [PermissionController::class, 'permissions'])->name('permissions');

Route::resource('groups', 'GroupController')->except(['show']);

Route::prefix('users')->name('users.')->group(function () {
    Route::get('/', [UserController::class, 'index'])->name('index');
    Route::get('/{id}', [UserController::class, 'edit'])->name('edit');
    Route::post('/{id}', [UserController::class, 'update'])->name('update');
});