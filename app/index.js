'use strict';

const _ = require('lodash'),
  generators = require('yeoman-generator'),
  chalk = require('chalk'),
  yosay = require('yosay'),
  files = [
    {
      src: 'eslintrc',
      dst: '.eslintrc'
    }, {
      src: 'gitignore',
      dst: '.gitignore'
    },
    'app',
    'build',
    'test',
    'package.json',
    'README.md'
  ],
  options = {};

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
  },
  initializing: function() {
    this.log(yosay(
      `Welcome to the good ol\' ${chalk.green('build-tool')} generator!`
    ));

    options.version = require('../package.json').version;
  },
  prompting: function() {
    const done = this.async(),
      questions = [
        {
          type: 'input',
          name: 'projectName',
          message: 'What\'s the name of the project?'
        }, {
          type: 'list',
          name: 'builder',
          message: 'Choose a builder!',
          choices: [
            'grunt',
            'gulp'
          ],
          default: 'grunt'
        }, {
          type: 'list',
          name: 'styles',
          message: 'Do you wish to use a CSS preprocessor?',
          choices: [
            'css',
            'less',
            'sass',
            'stylus'
          ],
          default: 'sass'
        }
      ];

    this.prompt(questions, (answers) => {
      options.projectName = answers.projectName;
      options.builder = answers.builder;
      options.styles = answers.styles;

      done();
    });
  },
  writing: function() {
    files.push(`${_.capitalize(options.builder)}file.js`);

    files.push({
      src: `${options.builder}/tasks`,
      dst: 'build/tasks'
    });

    if (options.styles !== 'css') {
      files.push({
        src: `${options.builder}/custom/styles.js`,
        dst: `build/tasks/${options.styles}.js`
      });
    }

    files.sort((a, b) => {
      const _a = typeof a === 'string' ? a : a.dst,
        _b = typeof b === 'string' ? b : b.dst;

      let result;

      if (_a === _b) {
        result = 0;
      } else {
        result = _a < _b ? -1 : 1;
      }

      return result;
    }).forEach((file) => {
      let src, dst;

      if (typeof file === 'string') {
        src = file;
        dst = file;
      } else {
        src = file.src;
        dst = file.dst;
      }

      this.fs.copyTpl(
        this.templatePath(src),
        this.destinationPath(dst),
        options
      );
    });
  },
  install: function() {
    const done = this.async();

    this.prompt({
      type: 'confirm',
      name: 'install',
      message: 'Do you wish to install dependencies?',
      default: false
    }, (answer) => {
      answer.install && this.npmInstall();

      done();
    });
  },
  end: function() {
    this.log('All done, time to build!');
  }
});
