var gulp = require('gulp'),
  jsdoc = require('gulp-jsdoc3'),
  config = require('../config/build.conf'),
  docConfig = require('../config/jsdoc.conf.json');

gulp.task('jsdoc', function(done) {
  gulp.src([config.source.app + '/**/*.js', 'README.md'])
    .pipe(jsdoc(docConfig, done));
});

gulp.task('doc', ['clean:doc', 'jsdoc']);
