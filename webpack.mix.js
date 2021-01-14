// noinspection JSAnnotator, JSUnresolvedFunction
const mix = require('laravel-mix');

mix
    .sass('resources/sass/app.sass', 'css/')
    .js('resources/js/index.js', 'js/app.js')

    .setPublicPath('public')
    .options({
        processCssUrls: false,
        terser: {
            extractComments: false,
        }
    })
    .react()
    mix.webpackConfig({
        devtool: "inline-source-map"
    })
    .sourceMaps()
;
