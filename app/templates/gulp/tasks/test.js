var gulp = require('gulp'),
  path = require('path'),
  config = require('../config/build.conf'),
  Promise = require('es6-promise').Promise,
  runSequence = require('run-sequence').use(gulp),
  protractor = require('gulp-protractor').protractor,
  Server = require('karma').Server,
  argv = require('yargs').argv;

/**
 * Run test once and exit
 * @param {string} testType - test config to run
 * @param {Function} callback - call back when test is done
 */
function runKarma(testType, callback) {
  var configFile = 'karma.${type}.conf.js'.replace('${type}', testType);

  new Server({
    configFile: path.join(__dirname, '../../test/config', configFile)
  }, callback).start();
}

/**
 * Runs protractor tests for a given browser.
 *
 * @param {string} browser - browser to run.
 * @returns {Promise} promise handler.
 */
function runProtractor(browser) {
  return new Promise(function(resolve, reject) {
    var args;

    if (argv.remote) {
      args = ['--seleniumAddress', config.test.seleniumAddress];
    } else {
      args = ['--directConect', 'true'];
    }

    gulp.src([
      config.source.test + '/config/protractor-globals.js',
      config.source.test + '/specs/functional/**/*.spec.js'
    ])
    .pipe(protractor({
      configFile: config.source.test + '/config/protractor.${browser}.conf.js'
        .replace('${browser}', browser),
      args: args
    }))
    .on('end', function() {
      resolve();
    })
    .on('error', function() {
      resolve();
    });
  });
}

config.test.testTypes.forEach(function(type) {
  gulp.task('karma:' + type, function(done) {
    runKarma(type, done);
  });

  gulp.task('test:' + type, function(done) {
    runSequence(
      ['html2js'],
      ['karma:' + type],
      done
    );
  });
});

config.test.browsers.forEach(function(browser) {
  gulp.task('protractor:run:' + browser, function(done) {
    runProtractor(browser).then(done);
  });

  gulp.task('test:functional:' + browser, function(done) {
    runSequence(
      ['build'],
      ['inject:test'],
      ['protractor:run:' + browser],
      done
    );
  });
});

gulp.task('protractor:run', function(done) {
  var tasks = config.test.browsers.map(function(browser) {
    return ['protractor:run:' + browser];
  });

  tasks.push(done);

  runSequence.apply(gulp, tasks);
});

gulp.task('test:functional', function(done) {
  runSequence(
    ['build'],
    ['inject:test'],
    ['protractor:run'],
    done
  );
});

gulp.task('test', function(done) {
  runSequence(
    ['test:unit'],
    ['test:coverage'],
    ['test:functional'],
    done
  );
});
