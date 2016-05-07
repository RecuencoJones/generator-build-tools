var gulp = require('gulp'),
  wrap = require('gulp-wrap'),
  config = require('../config/build.conf');

/**
 * Gets the current date in English string format.
 *
 * @returns {string} Release date.
 */
function getReleaseDate() {
  return (new Date()).toLocaleDateString('en-en', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

gulp.task('wrap:js', function() {
  return gulp.src(config.source.tmp + '/' + config.pkg.name + '.js')
    .pipe(wrap({
      src: config.source.build + '/templates/wrapper.ejs'
    }, {
      pkg: config.pkg,
      releaseDate: getReleaseDate()
    }))
    .pipe(gulp.dest(config.source.dist + '/'));
});

gulp.task('wrap:css', function() {
  return gulp.src(config.source.tmp + '/' + config.pkg.name + '.css')
    .pipe(wrap({
      src: config.source.build + '/templates/wrapper.ejs'
    }, {
      pkg: config.pkg,
      releaseDate: getReleaseDate()
    }))
    .pipe(gulp.dest(config.source.dist + '/'));
});
