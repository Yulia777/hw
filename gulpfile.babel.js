'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import csso from 'gulp-csso';

import babel from 'gulp-babel';
import gulpImports from 'gulp-imports';

var paths = {
  bundle: 'assets/es6/start.show.js',
  order: 'assets/es6/orders/main.js',
  sidebar: 'assets/es6/sidebar/start.sidebar.js',
  style: 'assets/sass/style.scss',
  images: 'assets/images/*',
  scripts: 'assets/js/compile.js',
  cssoCompile: 'assets/css/compile.css',
  fonts: 'assets/fonts/*'
};

gulp.task('fonts', () => {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('./build/fonts'));
});



gulp.task('compress', function () {
  return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(gulp.dest('./'));
});


gulp.task('sass', function() {
  var plugins = [
      autoprefixer({browsers: ['last 1 version']})
  ];
  return gulp.src(paths.style)
      .pipe(sass())
      .pipe(postcss(plugins))
      .pipe(gulp.dest('./assets/css/'));
});

gulp.task('es6-js', () => {
    browserify(paths.bundle)
        .transform(babelify)
        .bundle()
        .pipe(source('show.image.js'))
        .pipe(gulp.dest('./assets/js/'));
});

gulp.task('orders', () => {
    browserify(paths.order)
        .transform(babelify)
        .bundle()
        .pipe(source('perform.order.js'))
        .pipe(gulp.dest('./assets/js/'));
});

gulp.task('sidebar', () => {
    browserify(paths.sidebar)
        .transform(babelify)
        .bundle()
        .pipe(source('sidebar.follow.js'))
        .pipe(gulp.dest('./assets/js/'));
});

gulp.task('images', function() {
  return gulp.src(paths.images)
  .pipe(imagemin({optimizationLevel: 5}))
  .pipe(gulp.dest('build/img'));
});

gulp.task('watch-js', () => {
    /*gulp.watch('./assets/es6/Image.js', ['es6-js']);*/
    /*gulp.watch('./assets/es6/orders/!*.js', ['orders']);*/
    gulp.watch('./assets/es6/sidebar/*.js', ['sidebar']);
});
gulp.task('watch', function() {
   gulp.watch(paths.style, ['sass']);
  //  gulp.watch(paths.all, ['sass']);
  //  gulp.watch(paths.images, ['images']);
  //  gulp.watch(paths.scripts, ['compress']);
});

gulp.task('csso-compile', () => {
    return gulp.src(paths.cssoCompile)
        .pipe(csso({
            restructure: true,
            sourceMap: false,
            debug: true
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['watch', 'images', 'fonts', 'compress', 'inject']);
gulp.task('build', ['sass', 'images', 'fonts', 'compress', 'inject']);
gulp.task('script', ['compress']);
gulp.task('sass_to_css', ['sass', 'watch']);
gulp.task('transpile', ['es6-js', 'watch-js']);
gulp.task('orders-compile', ['orders', 'watch-js']);
gulp.task('sidebar-compile', ['sidebar', 'watch-js']);
gulp.task('prod-css', ['css-compile']);
gulp.task('build', ['sass', 'images', 'fonts']);

