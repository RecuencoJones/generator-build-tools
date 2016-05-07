/**
 * Documentation task.
 *
 * @param {Object} grunt Reference to the current Grunt process.
 */
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.config.set('jsdoc', {
    interface: {
      src: ['<%%= source.app %>/**/*.js', 'README.md'],
      options: {
        configure: '<%%= source.build %>/config/jsdoc.conf.json'
      }
    }
  });

  grunt.registerTask('doc', ['clean:doc', 'jsdoc']);
};
