/**
 * HTML2JS task for Angular templates.
 *
 * @param {Object} grunt Reference to the current Grunt process.
 */
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-html2js');

  grunt.config.set('html2js', {
    options: {
      base: '<%%= source.app %>/templates',
      module: '<%%= pkg.name %>',
      quoteChar: '\'',
      existingModule: true,
      singleModule: true
    },
    tmp: {
      src: ['<%%= source.app %>/**/*.tpl.html'],
      dest: '<%%= source.tmp %>/templates.js'
    }
  });
};
