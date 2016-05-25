/**
 * Clean task for temporary, dist, doc and test results folders.
 *
 * @param {Object} grunt Reference to the current Grunt process.
 */
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.config.set('clean', {
    options: {
      force: true
    },
    index: ['index.html'],
    test: ['<%%= source.test %>/results'],
    tmp: ['<%%= source.tmp %>'],
    dist: ['<%%= source.dist %>'],
    doc: ['<%%= source.doc %>']
  });
};
