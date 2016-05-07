/**
 * Wrap task for concatenated JS and CSS files.
 *
 * @param {Object} grunt Reference to the current Grunt process.
 */
module.exports = function(grunt) {
  /**
   * Gets the current date in English string format.
   * @returns {string} Release date.
   */
  function getReleaseDate() {
    return (new Date()).toLocaleDateString('en-en', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  grunt.loadNpmTasks('grunt-tpl-wrap');

  grunt.config.set('tpl-wrap', {
    options: {
      template: '<%%= source.build %>/templates/wrapper.ejs',
      prepare: function(data) {
        data.pkg = grunt.config.get('pkg');
        data.releaseDate = getReleaseDate();
        data.contents = data.fileContent;
      }
    },
    js: {
      files: {
        '<%%= source.dist %>/<%%= pkg.name %>.js': [
          '<%%= source.tmp %>/<%%= pkg.name %>.js'
        ]
      }
    },
    css: {
      files: {
        '<%%= source.dist %>/<%%= pkg.name %>.css': [
          '<%%= source.tmp %>/<%%= pkg.name %>.css'
        ]
      }
    }
  });

  grunt.registerTask('wrap:js', ['tpl-wrap:js']);
  grunt.registerTask('wrap:css', ['tpl-wrap:css']);
};
