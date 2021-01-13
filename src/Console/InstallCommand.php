<?php

namespace SrcLab\Permissions\Console;

use Illuminate\Console\Command;

class InstallCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'permissions:install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Install permissions package';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->comment('Publishing assets...');
        $this->callSilent('vendor:publish', [
            '--tag' => 'permissions-assets',
        ]);

        $this->comment('Publishing configuration...');
        $this->callSilent('vendor:publish', [
            '--tag' => 'permissions-config',
        ]);

        $this->info('Permissions package installed successfully.');
    }
}
