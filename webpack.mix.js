// noinspection JSAnnotator, JSUnresolvedFunction
const mix = require('laravel-mix');

mix
    .sass('resources/sass/app.sass', 'css/')
    .js('resources/js/app.jsx', 'js/')

    .setPublicPath('public')
    .options({
        processCssUrls: false,
        terser: {
            extractComments: false,
        }
    })
    .react()
    .copy('public', '../../../public/vendor/permissions');
    // mix.webpackConfig({
    //     devtool: "inline-source-map"
    // })
    // .sourceMaps()
;
