const gulp = require('gulp');
const gulpif = require('gulp-if');
const del = require('del');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const babelify = require('babelify');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const inject = require('gulp-inject');
const rev = require('gulp-rev');
const buffer1 = require('vinyl-buffer');
const plumber = require('gulp-plumber');
const env = require('gulp-env');
//const sourcemaps = require('gulp-sourcemaps');
//const gutil = require('gulp-util');
//const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');

let envs = env.set({NODE_ENV: 'debug'});

let config = {
    path: {
        src: {
            dir: './src/',
            css: './src/css/',
            js: './src/js/',
            jsapp: 'index.js',
            cssapp: 'style.scss',
            htmlapp: 'index.html'
        },
        public: {
            dir: './public/',
            css: './public/css/',
            js: './public/js/',
            app: 'bundle.js'
        }
    },
    jsext: ['.js']
}
config.path.src.jsall = [config.path.src.js + '**/*'];
config.path.src.cssall = [config.path.src.css + '*'];

gulp.task('lint', function () {
    return gulp.src(config.path.src.jsall)
        .pipe(envs)
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        //.pipe(eslint.failOnError());
        .pipe(eslint.failAfterError());
});

gulp.task('js', function () {

    console.log(process.env.NODE_ENV);
    //console.log(config.path.src.js + config.path.src.jsapp);
    del([config.path.public.js + '*']);

    return browserify({entries: config.path.src.js + config.path.src.jsapp, extensions: config.jsext, debug: false})
        .transform('loose-envify', { NODE_ENV: process.env.NODE_ENV})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        /*
        .on('error', function(err) {
            console.log(err);
            this.emit('end');
        })
        */
        .pipe(plumber())
        //.pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(sourcemaps.write())
        .pipe(source(config.path.public.app))
        //.pipe(buffer1())
        //.pipe(sourcemaps.write())
        .pipe(buffer1())
        .pipe(gulpif((process.env.NODE_ENV == 'production'), uglify()))
        .pipe(rev())
        .pipe(gulp.dest(config.path.public.js));
});

gulp.task('css', function () {

    del([config.path.public.css + '*']);

    return gulp.src(config.path.src.css + config.path.src.cssapp)
        .pipe(plumber())
        //.pipe(envs)
        //.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rev())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(config.path.public.css));
});

gulp.task('html', function() {
    const sources = gulp.src([config.path.public.js + '*.js', config.path.public.css + '*.css'], {read: false});
    return gulp.src(config.path.src.dir + config.path.src.htmlapp)
        .pipe(plumber())
        .pipe(inject(sources, {relative: false, ignorePath: [], addRootSlash: true}))
        .pipe(gulp.dest(config.path.public.dir));
});

gulp.task('html-css', ['css'], function() {
    return gulp.start('html');
});

gulp.task('html-js', ['js'], function() {
    return gulp.start('html');
});

gulp.task('html-full', ['css', 'js'], function() {
    return gulp.start('html');
});

gulp.task('watch', function() {
    gulp.watch(config.path.src.cssall, ['html-css']);
    gulp.watch(config.path.src.jsall, ['html-js']);
    gulp.watch(config.path.src.dir + config.path.src.htmlapp, ['html']);
});

gulp.task('build', ['lint', 'html-full']);

gulp.task('prod', function(){
    envs = env.set({
        NODE_ENV: 'production'
    });
    return gulp.start('html-full');
});

gulp.task('default', ['build', 'watch']);
