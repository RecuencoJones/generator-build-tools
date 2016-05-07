var gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  config = require('../config/build.conf');

/**
 * ESLint task for JS files.
 */
gulp.task('lint:js:app', function() {
  return gulp.src([
    config.source.app + '/**/*.js'
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});

gulp.task('lint:js:build', function() {
  return gulp.src([
    'Gulpfile.js',
    config.source.build + '/**/*.js'
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});

gulp.task('lint:js:test', function() {
  return gulp.src([
    config.source.test + '/config/*.js',
    config.source.test + '/specs/**/*.js'
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});

gulp.task('lint:js', [
  'lint:js:app',
  'lint:js:build',
  'lint:js:test'
]);
gulp.task('lint', ['lint:js']);
