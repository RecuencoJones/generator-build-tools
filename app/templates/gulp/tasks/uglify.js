var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  config = require('../config/build.conf'),
  logger = console;

/**
 * Uglify task for dist JS files.
 */
gulp.task('uglify', function() {
  return gulp.src([config.source.dist + '/' + config.pkg.name + '.js'])
    .pipe(uglify({
      outSourceMap: true,
      preserveComments: 'some'
    }).on('error', function(error) {
      logger.error(error.message);

      this.emit('end');
    }))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(config.source.dist));
});
