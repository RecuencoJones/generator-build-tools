/**
 * Setup concurrent tasks.
 *
 * @param {Object} grunt Reference to the current Grunt process.
 */
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.config.set('concurrent', {
    options: {
      logConcurrentOutput: true
    },
    default: [
      'watch'
    ]
  });
};
