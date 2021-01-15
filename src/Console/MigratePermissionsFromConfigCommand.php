<?php

namespace SrcLab\Permissions\Console;

use Illuminate\Console\Command;
use SrcLab\Permissions\Models\Permission;

//todo удалить после выполнения миграции
class MigratePermissionsFromConfigCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'permissions:migrate_from_config';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate permissions list from config';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        /**
         * Get permissions list from config.
         */
        $permissions_from_config = app_config('app_permissions.permissions');
        $permissions_groups_replace = app_config('permissions.permissions_groups_replace');

        if(empty($permissions_from_config)) {
            $this->error('Empty data from config.');
            return;
        }

        foreach ($permissions_from_config as $key => $item) {
            Permission::create([
                'id' => $key,
                'name' => $item['name'],
                'description' => $item['description'],
                'ui_group' => array_search($item['group'], $permissions_groups_replace),
                'created_at' => now(),
            ]);
        }

        $this->info('Permissions migrated. You should clear permissions list in config.');
    }
}
