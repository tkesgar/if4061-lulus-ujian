var
  // modul npm
  browsersync  = require('browser-sync'),
  del          = require('del'),
  gulp         = require('gulp'),
  wiredep      = require('wiredep'),
  
  // plugin gulp
  autoprefixer = require('gulp-autoprefixer'),
  concat       = require('gulp-concat'),
  less         = require('gulp-less'),
  minifycss    = require('gulp-minify-css'),
  sourcemaps   = require('gulp-sourcemaps'),
  uglify       = require('gulp-uglify'),
  util         = require('gulp-util'),
  
  // files
  files = {
    assets  : ['./assets/**'],
    js      : ['./js/*.js'],
    less    : ['./less/main.less']
  };

// copy assets + wiredep
gulp.task('assets', function() {
  return gulp.src(files.assets)
    .pipe(wiredep.stream())
    .pipe(gulp.dest('./public/'));
});

// "compile" js
gulp.task('js', function() {
  return gulp.src(files.js)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public'));
});

// compile less
gulp.task('less', function() {
  return gulp.src(files.less)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(minifycss())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public'));
});

// clean task
gulp.task('clean', function(f) {
  del(['./public/**/*'], f);
});

// build task
gulp.task('build', ['assets', 'js', 'less']);

// watch task
gulp.task('watch', ['build'], function() {
  // jika file build task berubah, build ulang
  gulp.watch('./assets/**', ['assets']);
  gulp.watch('./js/**',     ['js']);
  gulp.watch('./less/**',   ['less']);
});

// serve task
gulp.task('serve', ['build'], function() {
  
  // browsersync
  browsersync({ server: { baseDir: 'public' }});
  
  // jika file di public berubah, reload
  gulp.watch(['./public/**.html', './public/**.css', './public/**.js'], browsersync.reload);
  
});

// default task
gulp.task('default', ['build']);
