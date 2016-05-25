/**
 * Run the tests. Registered tasks:
 *   - test
 *   - test:unit
 *   - test:coverage
 *   - test:functional
 *
 * @param {Object} grunt Reference to the current Grunt process.
 */
module.exports = function(grunt) {
  var karmaTestTypes = grunt.config.get('test.testTypes'),
    protractorBrowsers = grunt.config.get('test.browsers'),
    argv = require('yargs').argv,
    karmaConfig = {},
    protractorConfig = {},
    protractorArgs = {};

  if (argv.remote) {
    protractorArgs.seleniumAddress = grunt.config.get('test.seleniumAddress');
  } else {
    protractorArgs.directConnect = true;
  }

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');

  // Configure karma with available test types.
  karmaTestTypes.forEach(function(testType) {
    karmaConfig[testType] = {
      configFile: '<%%= source.test %>/config/karma.${testType}.conf.js'
        .replace('${testType}', testType)
    };
  });

  grunt.config.set('karma', karmaConfig);

  // Configure protractor with available browsers.
  protractorBrowsers.forEach(function(browser) {
    protractorConfig[browser] = {
      options: {
        configFile: '<%%= source.test %>/config/protractor.${browser}.conf.js'
          .replace('${browser}', browser),
        args: protractorArgs
      }
    };
  });
  grunt.config.set('protractor', protractorConfig);

  // Register the test tasks.
  grunt.registerTask('test:unit', [
    'inject:test',
    'html2js',
    'karma:unit'
  ]);

  grunt.registerTask('test:tdd', [
    'inject:test',
    'html2js',
    'karma:tdd'
  ]);

  grunt.registerTask('test:coverage', [
    'inject:test',
    'html2js',
    'karma:coverage'
  ]);

  grunt.registerTask('test:functional', function(browser) {
    grunt.task.run([
      'build',
      'inject:test',
      ['protractor', (browser || '*')].join(':')
    ]);
  });

  grunt.registerTask('test', [
    'test:unit',
    'test:coverage',
    'test:functional'
  ]);
};
