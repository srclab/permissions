<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="back-url" content="{{ app_config('permissions.view.back_url') }}">
    <title>{{ __('permissions::general.view.title') }}</title>
    <link href="{{ asset('/vendor/srclab/permissions/css/app.css') }}" rel="stylesheet">
</head>
<body>
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>
<script src="{{ asset('/vendor/srclab/permissions/js/app.js') }}"></script>
</body>
</html>
