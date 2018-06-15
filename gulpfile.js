'use strict';

var public_dir = '.';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var pug = require('gulp-pug');
var rename = require("gulp-rename");

var dependencies = [
];


function bundleApp() {
  // Browserify will bundle all our js files together in to one and will let
  // us use modules in the front end.
  var appBundler = browserify({
    entries: './src/es6/main.js',
    debug: false
  });

  appBundler
  // transform ES6 and JSX to ES5 with babelify
    .transform("babelify", {presets: ["es2015"]})
    .bundle()
    .on('error',gutil.log)
    .pipe(source('bundle.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      // Add transformation tasks to the pipeline here.
      .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(public_dir + '/assets/js/'));
}

gulp.task('scripts', function (){
  bundleApp();
});

gulp.task('scripts:watch', function () {
  gulp.watch(['./src/es6/*.js'], ['scripts']);
});

gulp.task('reload', function(){
  browserSync.reload();
});

gulp.task('sass', function () {
  gulp.src('./src/sass/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(public_dir + '/assets/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('serve', ['sass'], function() {

  browserSync.init({
    server: {
      baseDir: public_dir,
      index: "index.html"
    }
  });

  gulp.watch('./src/sass/**/*.scss', ['sass', 'reload']);
});

gulp.task('pug', function() {
  gulp
      .src(['./src/pug/**/*.pug', '!./src/pug/include/**/*.pug', '!./src/pug/tpl/**/*.pug', '!./src/pug/src/sections/**/*.pug']).pipe(
      pug({
        pretty: true,
        data: require('./src/pug/data.js'),
      })).pipe(
      rename({
        extname: ".html"
      })).pipe(
      gulp.dest(public_dir));
});

gulp.task('default', ['pug', 'sass', 'scripts']);