<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ __('permissions::general.view.title') }}</title>

    <link href="{{ asset('/vendor/permissions/css/app.css') }}" rel="stylesheet">
</head>
<body>
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>
{{--<nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">--}}
{{--    <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="{{ route('permissions::index') }}">{{ __('permissions::general.view.navbar_title') }}</a>--}}
{{--    <ul class="navbar-nav px-3">--}}
{{--        <li class="nav-item text-nowrap">--}}
{{--            <a class="nav-link" href="{{ app_config('permissions.view.back_url') }}">{{ __('permissions::general.view.back_button') }}</a>--}}
{{--        </li>--}}
{{--    </ul>--}}
{{--</nav>--}}

{{--<div class="container-fluid">--}}
{{--    <div class="row">--}}
{{--        <nav class="col-md-2 d-none d-md-block bg-light sidebar">--}}
{{--            <div class="sidebar-sticky">--}}
{{--                //todo--}}
{{--                <div id="like_button_container"></div>--}}
{{--            </div>--}}
{{--        </nav>--}}
{{--    </div>--}}
{{--</div>--}}

{{--<script src="https://unpkg.com/react@17/umd/react.production.min.js" crossorigin></script>--}}
{{--<script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js" crossorigin></script>--}}
<script src="{{ asset('/vendor/permissions/js/app.jsx') }}"></script>

</body>
</html>
