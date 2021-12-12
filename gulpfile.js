var gulp = require('gulp');
var concat = require('gulp-concat');
var del = require('del');
var inject = require('gulp-inject');
var csso = require('gulp-csso');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var runSequence = require('gulp4-run-sequence');
const babel = require('gulp-babel');

gulp.task('scripts', function () {
  return gulp.src(['./src/js/**/!(main)*.js', './src/js/main.js'])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('css', function () {
  return gulp.src('./src/css/**/*.css')
    .pipe(concat('all.css'))
    .pipe(csso())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('html', function () {
  var sources = gulp.src(['./dist/all.js', './dist/all.css'], { read: false, allowEmpty: true });

  return gulp.src('./src/index.html')
    .pipe(inject(sources, {
      addRootSlash: true,
      ignorePath: '/dist/'
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      allowEmpty: true
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('resources', function () {
  return gulp.src('./src/res/**')
    .pipe(gulp.dest('./dist/res'));
});

gulp.task('clean', function (done) {
  del(['dist']);
  done();
});

gulp.task('default', function (done) {
  runSequence(
    'clean',
    'scripts',
    'css',
    'html',
    'resources'
  );
  done();
});