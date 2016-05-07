var gulp = require('gulp'),
  config = require('../config/build.conf');

/**
 * Copy files to temporary directory.
 */
gulp.task('copy:js', function() {
  return gulp.src([
    config.source.app + '/**/*.js'
  ])
  .pipe(gulp.dest(config.source.tmp));
});

<% if (styles === 'css') { -%>
gulp.task('copy:css', function() {
  return gulp.src([
    config.source.app + '/**/*.css'
  ])
  .pipe(gulp.dest(config.source.tmp));
});

<% } -%>
gulp.task('copy', [
  'copy:js'<% if (styles === 'css') { %>,
  'copy:css'
<% } -%>
]);
