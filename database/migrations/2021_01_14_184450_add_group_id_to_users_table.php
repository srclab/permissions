<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddGroupIdToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(Schema::hasColumn(app_config('permissions.tables.users'), app_config('permissions.tables.relations.user_group_field'))) {
            return;
        }

        Schema::table(app_config('permissions.tables.users'), function (Blueprint $table) {
            $table->unsignedInteger(app_config('permissions.tables.relations.user_group_field'))->after('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table(app_config('permissions.tables.users'), function (Blueprint $table) {
            $table->dropColumn(app_config('permissions.tables.relations.user_group_field'));
        });
    }
}
