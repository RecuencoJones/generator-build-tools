var gulp = require('gulp');

gulp.task('concurrent', [
  'test:tdd',
  'watch'
]);
