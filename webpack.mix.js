const mix = require('laravel-mix');

mix
    .js('resources/js/main.tsx', 'public/js')
    .react()
    .postCss('resources/css/app.css', 'public/css', [
        //
    ]);