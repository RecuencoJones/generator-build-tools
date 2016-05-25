/**
 * Main build task.
 *
 * @param {Object} grunt Reference to the current Grunt process.
 */
module.exports = function(grunt) {
  grunt.registerTask('build:js', [
    'copy:js',
    'html2js',
    'concat:js',
    'wrap:js',
    'uglify'
  ]);

  grunt.registerTask('build:css', [
<% if (styles === 'css') { -%>
    'copy:css',
<% } else { -%>
    '<%= styles %>',
<% } -%>
    'concat:css',
    'wrap:css'
  ]);

  grunt.registerTask('build', [
    'clean:index',
    'clean:tmp',
    'clean:dist',
    'build:js',
    'build:css',
    'inject:app'
  ]);
};
