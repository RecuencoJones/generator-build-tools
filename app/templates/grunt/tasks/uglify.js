/**
 * Uglify task for dist JS files.
 *
 * @param {Object} grunt Reference to the current Grunt process.
 */
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.config.set('uglify', {
    dist: {
      options: {
        sourceMap: true,
        preserveComments: 'some'
      },
      files: {
        '<%%= source.dist %>/<%%= pkg.name %>.min.js': [
          '<%%= source.dist %>/<%%= pkg.name %>.js'
        ]
      }
    }
  });
};
