/**
 * Copy files to temporary directory.
 *
 * @param {Object} grunt Reference to the current Grunt process.
 */
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.config.set('copy', {
    js: {
      files: [
        {
          expand: true,
          cwd: '<%%= source.app %>/',
          src: ['**/*.js'],
          dest: '<%%= source.tmp %>/',
          ext: '.js'
        }
      ]
    }<% if (styles === 'css') { %>,
    css: {
      files: [
        {
          expand: true,
          cwd: '<%%= source.app %>/',
          src: [
            '**/*.css'
          ],
          dest: '<%%= source.tmp %>/',
          ext: '.css'
        }
      ]
    }<% } %>
  });
};
