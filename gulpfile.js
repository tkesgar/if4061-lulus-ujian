var
  // modul npm
  browsersync  = require('browser-sync'),
  del          = require('del'),
  gulp         = require('gulp'),
  
  // plugin gulp
  autoprefixer = require("gulp-autoprefixer"),
  concat       = require('gulp-concat'),
  less         = require('gulp-less'),
  minifycss    = require("gulp-minify-css"),
  sourcemaps   = require('gulp-sourcemaps'),
  uglify       = require('gulp-uglify'),
  util         = require('gulp-util'),
  
  // files
  files = {
    assets  : ['./assets/**'],
    js      : ['./js/*.js'],
    less    : ['./less/*.less']
  };

// copy assets
gulp.task('assets', function() {
  return gulp.src(files.assets).pipe(gulp.dest('./public'));
});

// "compile" js
gulp.task('js', function() {
  return gulp.src(files.js)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('script.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js'));
});

// compile less
gulp.task('less', function() {
  return gulp.src(files.less)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(minifycss())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/css'));
});

// clean task
gulp.task('clean', function(f) {
  del(['./public/**/*'], f);
});

// build task
gulp.task('build', ['assets', 'js', 'less']);

// serve task
gulp.task('serve', ['build'], function() {
  
  // browsersync
  browsersync({ server: { baseDir: 'public' }});
  
  // jika file di public berubah, reload
  gulp.watch('./public/**', browsersync.reload);
  
  // jika file build task berubah, reload
  gulp.watch(files.assets, ['assets']);
  gulp.watch(files.js,     ['js']);
  gulp.watch(files.less,   ['less']);
  
});

// default task
gulp.task('default', ['build']);
