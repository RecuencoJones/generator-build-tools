var gulp = require('gulp');

gulp.task('watch:app:js', function() {
  return gulp.watch('app/**/*.js', [
    'lint:js:app',
    'build:js'
  ]);
});

gulp.task('watch:app:css', function() {
  return gulp.watch('app/styles/**/*', [
    'build:css'
  ]);
});

gulp.task('watch:app:html', function() {
  return gulp.watch('app/**/*.html', [
    'build:js'
  ]);
});

gulp.task('watch:build:js', function() {
  return gulp.watch('build/**/*.js', [
    'lint:js:build'
  ]);
});

gulp.task('watch:test:js', function() {
  return gulp.watch([
    'test/config/*.js',
    'test/specs/**/*.js'
  ], [
    'lint:js:test'
  ]);
});

gulp.task('watch', [
  'watch:app:js',
  'watch:app:css',
  'watch:app:html',
  'watch:build:js',
  'watch:test:js'
]);
