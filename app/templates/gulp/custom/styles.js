var gulp = require('gulp'),
  <%= styles %> = require('gulp-<%= styles %>'),
  config = require('../config/build.conf');

/**
 * Tasks to preprocess <%= styles %> files.
 */
gulp.task('<%= styles %>', function() {
  return gulp.src([
    config.source.app + '/styles/styles<% if (styles === 'less') { %>.less'<% } else if (styles === 'sass') { %>.scss'<% } else if (styles === 'stylus') { %>.styl'<% } %>
  ])
  .pipe(<%= styles %>())
  .pipe(gulp.dest(config.source.tmp + '/styles'));
});
