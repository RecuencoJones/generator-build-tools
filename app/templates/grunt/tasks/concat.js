/**
 * Concat task for built JS and CSS files.
 *
 * @param {Object} grunt Reference to the current Grunt process.
 */
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.config.set('concat', {
    options: {
      separator: '\n'
    },
    js: {
      src: [
        '!<%%= pkg.name %>.js',
        '<%%= source.tmp %>/**/*.js'
      ],
      dest: '<%%= source.tmp %>/<%%= pkg.name %>.js'
    },
    css: {
      src: [
        '!<%%= pkg.name %>.css',
        '<%%= source.tmp %>/**/*.css'
      ],
      dest: '<%%= source.tmp %>/<%%= pkg.name %>.css'
    }
  });
};
