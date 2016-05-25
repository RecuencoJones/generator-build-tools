/**
 * Wrap task for concatenated JS and CSS files.
 *
 * @param {Object} grunt Reference to the current Grunt process.
 */
module.exports = function(grunt) {
  var path = require('path'),
    dependencies = require('../config/dependencies.json');

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

  /**
   * Wraps a script file into a script element.
   *
   * @param {string} script - script file path
   * @param {string} basePath - base path for files
   * @returns {string} script element
   */
  function scriptWrapper(script, basePath) {
    return '<script src="' + path.join(basePath, script) + '"></script>';
  }

  /**
   * Wraps a stylesheet file into a link element.
   *
   * @param {string} file - stylesheet file path
   * @param {string} basePath - base path for files
   * @returns {string} link element
   */
  function linkWrapper(file, basePath) {
    return '<link href="' + path.join(basePath, file) + '" rel="stylesheet">';
  }

  /**
   * Wraps dependencies into html elements.
   *
   * @param {string} basePath - base path for files
   * @returns {Object} dependencies map.
   */
  function wrapDependencies(basePath) {
    var _basePath = basePath || '';

    return {
      js: {
        app: dependencies.js.app.map(function(script) {
          return scriptWrapper(script, _basePath);
        }).join('\n'),
        libs: dependencies.js.libs.map(function(script) {
          return scriptWrapper(script, _basePath);
        }).join('\n')
      },
      css: {
        app: dependencies.css.app.map(function(file) {
          return linkWrapper(file, _basePath);
        }).join('\n'),
        libs: dependencies.css.libs.map(function(file) {
          return linkWrapper(file, _basePath);
        }).join('\n')
      }
    };
  }

  grunt.loadNpmTasks('grunt-tpl-wrap');

  grunt.config.set('tpl-wrap', {
    options: {
      prepare: function(data) {
        data.pkg = grunt.config.get('pkg');
        data.releaseDate = getReleaseDate();
        data.contents = data.fileContent;
      }
    },
    js: {
      options: {
        template: '<%%= source.build %>/templates/wrapper.ejs'
      },
      files: {
        '<%%= source.dist %>/<%%= pkg.name %>.js': [
          '<%%= source.tmp %>/<%%= pkg.name %>.js'
        ]
      }
    },
    css: {
      options: {
        template: '<%%= source.build %>/templates/wrapper.ejs'
      },
      files: {
        '<%%= source.dist %>/<%%= pkg.name %>.css': [
          '<%%= source.tmp %>/<%%= pkg.name %>.css'
        ]
      }
    },
    app: {
      options: {
        template: '<%%= source.build %>/templates/layout.ejs',
        prepare: function(data) {
          data.inject = wrapDependencies();
          data.content = grunt.file.read('app/app.html');
        }
      },
      files: {
        'index.html': []
      }
    },
    test: {
      options: {
        template: '<%%= source.build %>/templates/layout.ejs',
        prepare: function(data) {
          data.inject = wrapDependencies('../..');
          data.content = '${test.template}';
        }
      },
      files: {
        '<%%= source.tmp %>/test/index.ejs': []
      }
    }
  });

  grunt.registerTask('wrap:js', ['tpl-wrap:js']);
  grunt.registerTask('wrap:css', ['tpl-wrap:css']);

  grunt.registerTask('inject:app', ['tpl-wrap:app']);
  grunt.registerTask('inject:test', ['tpl-wrap:test']);
};
