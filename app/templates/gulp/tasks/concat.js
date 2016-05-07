var gulp = require('gulp'),
  concat = require('gulp-concat'),
  config = require('../config/build.conf');

/**
 * Concat task for built JS files.
 */
gulp.task('concat:js', function() {
  return gulp.src([
    config.source.tmp + '/**/*.js'
  ])
  .pipe(concat(config.pkg.name + '.js'))
  .pipe(gulp.dest(config.source.tmp + '/'));
});

/**
 * Concat task for built CSS files.
 */
gulp.task('concat:css', function() {
  return gulp.src([
    config.source.tmp + '/**/*.css'
  ])
  .pipe(concat(config.pkg.name + '.css'))
  .pipe(gulp.dest(config.source.tmp + '/'));
});

gulp.task('concat', ['concat:js', 'concat:css']);
