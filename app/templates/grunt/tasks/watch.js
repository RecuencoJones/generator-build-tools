/**
 * Watch task to live compile files.
 *
 * @param {Object} grunt Reference to the current Grunt process.
 */
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.config.set('watch', {
    'app:js': {
      files: '<%%= source.app %>/**/*.js',
      tasks: [
        'lint:js:app',
        'build:js'
      ]
    },
    'app:css': {
      files: '<%%= source.app %>/styles/**/*',
      tasks: [
        'build:css'
      ]
    },
    'app:html': {
      files: '<%%= source.app %>/**/*.html',
      tasks: [
        'build:js'
      ]
    },
    'build:js': {
      files: '<%%= source.build %>/**/*.js',
      tasks: [
        'lint:js:build'
      ]
    },
    'test:js': {
      files: [
        '<%%= source.test %>/config/*.js',
        '<%%= source.test %>/specs/**/*.js'
      ],
      tasks: [
        'lint:js:test'
      ]
    }
  });
};
