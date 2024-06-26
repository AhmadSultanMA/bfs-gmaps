<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Polyfill -->
        <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
        <!-- Google Maps API -->
        <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDBEXtTGUC4HiyflEfeqo-74WdAUJLT1E0&callback=initMap&v=weekly&solution_channel=GMP_CCS_geocodingservice_v1"
            defer
        ></script>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
