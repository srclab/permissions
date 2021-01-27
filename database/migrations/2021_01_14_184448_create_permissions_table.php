<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(Schema::hasTable(app_config('permissions.tables.permissions'))) {
            return;
        }

        Schema::create(app_config('permissions.tables.permissions'), function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 64)->unique();
            $table->string('description', 256)->nullable();
            $table->tinyInteger('ui_group')->default(0)->comment('For UI grouping');
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
        Schema::dropIfExists(app_config('permissions.tables.permissions'));
    }
}
