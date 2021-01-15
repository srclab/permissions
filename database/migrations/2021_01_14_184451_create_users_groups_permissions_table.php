<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersGroupsPermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(Schema::hasTable(app_config('permissions.tables.users_groups_permissions'))) {
            return;
        }

        Schema::create(app_config('permissions.tables.users_groups_permissions'), function (Blueprint $table) {
            $table->unsignedInteger('group_id');
            $table->unsignedInteger('permission_id');
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();

            $table->unique(['group_id', 'permission_id']);

            $table->foreign('group_id')->references('id')->on(app_config('permissions.tables.users_groups'))->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('permission_id')->references('id')->on(app_config('permissions.tables.permissions'))->onDelete('cascade')->onUpdate('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists(app_config('permissions.tables.users_groups_permissions'));
    }
}
