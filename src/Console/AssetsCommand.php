<?php

namespace SrcLab\Permissions\Console;

use Illuminate\Console\Command;

class AssetsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'permissions:assets';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Re-publish the permissions assets';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->call('vendor:publish', [
            '--tag' => 'permissions-assets',
            '--force' => true,
        ]);
    }
}
