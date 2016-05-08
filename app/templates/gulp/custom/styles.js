var gulp = require('gulp'),
  <%= styles %> = require('gulp-<%= styles %>'),
  config = require('../config/build.conf'),
  logger = console;

/**
 * Tasks to preprocess <%= styles %> files.
 */
gulp.task('<%= styles %>', function() {
  return gulp.src([
    config.source.app + '/styles/styles<% if (styles === 'less') { %>.less'<% } else if (styles === 'sass') { %>.scss'<% } else if (styles === 'stylus') { %>.styl'<% } %>
  ])
  .pipe(<%= styles %>().on('error', function(error) {
    logger.error(error.message);

    this.emit('end');
  }))
  .pipe(gulp.dest(config.source.tmp + '/styles'));
});
