const {src, dest, series, watch} = require('gulp')
const sass = require( 'gulp-sass' )
const csso = require( 'gulp-csso' )
const htmlmin = require( 'gulp-htmlmin' )
const sync = require( 'browser-sync' ).create()
const del = require( 'del' )
const autoprefixer = require( 'gulp-autoprefixer' )
const concat = require( 'gulp-concat' )
const image = require( 'gulp-image' )

function html() {
    return src( 'src/**.html' )
        .pipe( htmlmin({
            collapseWhitespace: true
        }) )
        .pipe( dest( 'dist' ) )

}

function scss() {
    return src( 'src/scss/**.scss' )
        .pipe( sass() )
        .pipe( autoprefixer( {
            overrideBrowserslist: ['last 2 versions']
        } ) )
        .pipe( csso() )
        .pipe( concat( 'main.css' ) )
        .pipe( dest('dist/css') )
}

function img() {
    return src( 'src/img/*' )
            .pipe( image() )
            .pipe( dest('dist/img') )
}

function clear() {
    return del( 'dist' );
}

function serve() {
    sync.init( {
        server: './dist'
    } )

    watch( 'src/**.html', series( html ) ).on( 'change', sync.reload )
    watch( 'src/scss/**.scss', series( scss ) ).on( 'change', sync.reload )
    watch( 'src/img/*', series( img ) ).on( ['add', 'change'], sync.reload )
}


exports.build = series(  clear, scss, html, img )
exports.serve = series ( clear, scss, html, img, serve )
exports.clear = clear
