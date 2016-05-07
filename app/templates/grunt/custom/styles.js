/**
 * Tasks to preprocess <%= styles %> files.
 *
 * @param {Object} grunt Reference to the current Grunt process.
 */
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-<%= styles %>');

  grunt.config.set('<%= styles %>', {
    build: {
      files: [
        {
          expand: true,
          cwd: '<%%= source.app %>/styles',
          src: [
            'styles<% if (styles === 'less') { %>.less'<% } else if (styles === 'sass') { %>.scss'<% } else if (styles === 'stylus') { %>.styl'<% } %>
          ],
          dest: '<%%= source.tmp %>/styles',
          ext: '.css'
        }
      ]
    }
  });
};
