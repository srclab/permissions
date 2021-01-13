<?php

namespace SrcLab\Permissions;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class PermissionsServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if (! defined('PERMISSIONS_PACKAGE_PATH')) {
            define('PERMISSIONS_PACKAGE_PATH', realpath(__DIR__.'/../'));
        }

        $this->registerConfigs();
        $this->registerCommands();
        $this->registerPublishes();
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerResources();
        $this->registerTranslations();
        $this->registerRoutes();
    }

    /**
     * Register the routes.
     *
     * @return void
     */
    protected function registerRoutes()
    {
        Route::group([
            'domain' => app_config('permissions.route.domain'),
            'prefix' => app_config('permissions.route.path'),
            'middleware' => app_config('permissions.route.middleware'),
            'as' => 'permissions::',
            'namespace' => 'SrcLab\Permissions\Http\Controllers',
        ], function () {
            $this->loadRoutesFrom(PERMISSIONS_PACKAGE_PATH.'/routes/web.php');
        });
    }

    /**
     * Register the resources.
     *
     * @return void
     */
    protected function registerResources()
    {
        $this->loadViewsFrom(PERMISSIONS_PACKAGE_PATH.'/resources/views', 'permissions');
    }

    /**
     * Register the translations.
     *
     * @return void
     */
    protected function registerTranslations()
    {
        $this->loadTranslationsFrom(PERMISSIONS_PACKAGE_PATH.'/resources/lang', 'permissions');
    }

    /**
     * Register configs.
     *
     * @return void
     */
    protected function registerConfigs()
    {
        $this->mergeConfigFrom(PERMISSIONS_PACKAGE_PATH.'/config/config.php', 'permissions');
    }

    /**
     * Register publishes.
     *
     * @return void
     */
    protected function registerPublishes()
    {
        if ($this->app->runningInConsole()) {

            $this->publishes([
                PERMISSIONS_PACKAGE_PATH.'/config/config.php' => config_path('permissions.php'),
            ], 'permissions-config');

            $this->publishes([
                PERMISSIONS_PACKAGE_PATH.'/public' => public_path('vendor/permissions'),
            ], 'permissions-assets');
        }
    }

    /**
     * Register commands.
     *
     * @return void
     */
    protected function registerCommands()
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                Console\AssetsCommand::class,
                Console\InstallCommand::class,
            ]);
        }
    }
}
