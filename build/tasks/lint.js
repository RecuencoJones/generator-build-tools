/**
 * ESLint task for JS files.
 *
 * @param {Object} grunt Reference to the current Grunt process.
 */
module.exports = function(grunt) {
  grunt.loadNpmTasks('gruntify-eslint');

  grunt.config.set('eslint', {
    app: {
      src: [
        '<%= source.app %>/index.js'
      ]
    },
    build: {
      src: [
        'Gruntfile.js',
        '<%= source.build %>/**/*.js'
      ]
    }
  });

  grunt.registerTask('lint:js:app', ['eslint:app']);
  grunt.registerTask('lint:js:build', ['eslint:build']);
  grunt.registerTask('lint:js', [
    'lint:js:app',
    'lint:js:build'
  ]);
  grunt.registerTask('lint', ['lint:js']);
};
