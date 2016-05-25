var gulp = require('gulp'),
  fs = require('fs'),
  path = require('path'),
  wrap = require('gulp-wrap'),
  rename = require('gulp-rename'),
  config = require('../config/build.conf'),
  dependencies = require('../config/dependencies.json');

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

/**
 * Wraps a script file into a script element.
 *
 * @param {string} script - script file path
 * @param {string} basePath - base path for files
 * @returns {string} script element
 */
function scriptWrapper(script, basePath) {
  return '<script src="' + path.join(basePath, script) + '"></script>';
}

/**
 * Wraps a stylesheet file into a link element.
 *
 * @param {string} file - stylesheet file path
 * @param {string} basePath - base path for files
 * @returns {string} link element
 */
function linkWrapper(file, basePath) {
  return '<link href="' + path.join(basePath, file) + '" rel="stylesheet">';
}

/**
 * Wraps dependencies into html elements.
 *
 * @param {string} basePath - base path for files
 * @returns {Object} dependencies map.
 */
function wrapDependencies(basePath) {
  var _basePath = basePath || '';

  return {
    js: {
      app: dependencies.js.app.map(function(script) {
        return scriptWrapper(script, _basePath);
      }).join('\n'),
      libs: dependencies.js.libs.map(function(script) {
        return scriptWrapper(script, _basePath);
      }).join('\n')
    },
    css: {
      app: dependencies.css.app.map(function(file) {
        return linkWrapper(file, _basePath);
      }).join('\n'),
      libs: dependencies.css.libs.map(function(file) {
        return linkWrapper(file, _basePath);
      }).join('\n')
    }
  };
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

gulp.task('inject:app', function() {
  var fileContents = fs.readFileSync(config.source.app + '/app.html');

  return gulp.src('package.json')
    .pipe(wrap({
      src: config.source.build + '/templates/layout.ejs'
    }, {
      inject: wrapDependencies(),
      content: fileContents
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('.'));
});

gulp.task('inject:test', function() {
  return gulp.src('package.json')
    .pipe(wrap({
      src: config.source.build + '/templates/layout.ejs'
    }, {
      inject: wrapDependencies('../..'),
      content: '${test.template}'
    }))
    .pipe(rename('index.ejs'))
    .pipe(gulp.dest(config.source.tmp + '/test'));
});
