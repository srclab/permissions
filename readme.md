# Laravel permissions package

## Installation

```
$ composer require srclab/permissions

$ php artisan permissions:install
```

## Update assets

```
$ php artisan permissions:assets
```

## Usage

Visit default route /permissions for settings.

Use contract \SrcLab\Permissions\Contracts\WithPermissions and trait \SrcLab\Permissions\Contracts\WithPermissions in your 
User model for access to permissions methods: $user->access('admin_panel'), 
$user->accessAtLeastOne(['admin_panel', 'admin_permissions'])