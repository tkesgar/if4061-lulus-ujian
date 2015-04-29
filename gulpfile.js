var
  // plugin untuk less
  autoprefixer = require("less-plugin-autoprefix"),
  cleancss     = require("less-plugin-clean-css"),

  // modul npm
  browsersync  = require('browser-sync'),
  del          = require('del'),
  gulp         = require('gulp'),

  // modul gulp
  concat       = require('gulp-concat'),
  less         = require('gulp-less'),
  uglifyjs     = require('gulp-uglifyjs');

gulp

// menyalin assets
.task('assets', function() {
  return gulp.src(['assets/**'])
    .pipe(gulp.dest('public'))
})

// menggabungkan js menjadi satu file lalu di-uglify
.task('scripts', function() {
  return gulp.src(['js/*.js'])
    .pipe(concat('script.js'))
    .pipe(uglifyjs())
    .pipe(gulp.dest('public/js'));
})

// mengkompilasi less (_nama.less tidak dikompilasi)
.task('styles', function() {
  return gulp.src(['less/*.less', '!less/_*.less'])
    .pipe(less({
      plugins: [new autoprefixer(), new cleancss()]
    }))
    .pipe(gulp.dest('public/css'));
})

// clean task
.task('clean', function() {
  del.sync(['public/**']);
  return;
})

// build task
.task('build', ['assets', 'scripts', 'styles'])

// serve task
.task('serve', ['build'], function() {

  // mulai browsersync
  browsersync({
    server: {
      baseDir: 'public'
    }
  });

  // watch jika file js berubah
  gulp.watch(['js/*.js'], ['scripts']);

  // watch jika file less berubah
  gulp.watch(['less/*.less'], ['styles']);

  // watch jika file tertentu di public berubah
  gulp.watch(['**.html', 'css/**', 'js/**', 'data/**', 'img/**'
  ], { cwd: 'public' }, browsersync.reload);
})

// default task
.task('default', ['build']);
