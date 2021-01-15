<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(Schema::hasTable(app_config('permissions.tables.users_groups'))) {
            return;
        }

        Schema::create(app_config('permissions.tables.users_groups'), function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('parent_id');
            $table->string('name', 32);
            $table->string('description', 256)->nullable();
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists(app_config('permissions.tables.users_groups'));
    }
}
