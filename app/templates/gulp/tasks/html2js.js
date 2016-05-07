var gulp = require('gulp'),
  concat = require('gulp-concat'),
  html2js = require('gulp-html2js'),
  config = require('../config/build.conf');

/**
 * Convert HTML templates to js into temporary directory.
 */
gulp.task('html2js', function() {
  return gulp.src(config.source.app + '/templates/**/*.tpl.html')
    .pipe(html2js({
      base: config.source.app + '/templates',
      outputModuleName: config.pkg.name,
      quoteChar: '\''
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(config.source.tmp));
});
