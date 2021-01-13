<?php

use App\Http\Controllers\Web\Admin\Permissions\UserController;
use Illuminate\Support\Facades\Route;
use SrcLab\Permissions\Http\Controllers\GroupController;
use SrcLab\Permissions\Http\Controllers\PermissionController;

Route::get('/', [PermissionController::class, 'index'])->name('index');
Route::get('/permissions', [PermissionController::class, 'permissions'])->name('permissions');

Route::resource('groups', GroupController::class)->except(['show']);

Route::prefix('users')->name('users.')->group(function () {
    Route::post('/', [UserController::class, 'index'])->name('index');
    Route::get('/{id}', [UserController::class, 'edit'])->name('edit');
    Route::post('/{id}', [UserController::class, 'update'])->name('update');
});