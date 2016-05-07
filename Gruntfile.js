/**
 * Grunt main file.
 *
 * @param {Object} grunt Reference to the current Grunt process.
 */
module.exports = function(grunt) {
  grunt.initConfig(require('./build/config/build.conf'));

  // Load defined grunt tasks.
  grunt.loadTasks('build/tasks');

  // Register default task.
  grunt.registerTask('default', [
    'lint'
  ]);
};
