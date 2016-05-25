var gulp = require('gulp'),
  clean = require('gulp-clean'),
  config = require('../config/build.conf');

/**
 * Clean task for index file.
 */
gulp.task('clean:index', function() {
  return gulp.src('index.html', {read: false})
    .pipe(clean({force: true}));
});

/**
 * Clean task for temporary folder.
 */
gulp.task('clean:tmp', function() {
  return gulp.src(config.source.tmp, {read: false})
    .pipe(clean({force: true}));
});

/**
 * Clean task for distribution folder.
 */
gulp.task('clean:dist', function() {
  return gulp.src(config.source.dist, {read: false})
    .pipe(clean({force: true}));
});

/**
 * Clean task for documentation folder.
 */
gulp.task('clean:doc', function() {
  return gulp.src(config.source.doc, {read: false})
    .pipe(clean({force: true}));
});

/**
 * Clean task for test results.
 */
gulp.task('clean:test', function() {
  return gulp.src(config.source.test + '/results', {read: false})
    .pipe(clean({force: true}));
});

/**
 * General clean task.
 */
gulp.task('clean', [
  'clean:index',
  'clean:tmp',
  'clean:dist',
  'clean:doc',
  'clean:test'
]);
