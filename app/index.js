const _ = require('lodash');
const generators = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const files = [
  {
    src: 'eslintrc',
    dst: '.eslintrc'
  }, {
    src: 'gitignore',
    dst: '.gitignore'
  },
  'package.json',
  'README.md'
];

const options = {};

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
  },
  initializing: function() {
    this.log(yosay(
      `Welcome to the good ol\' ${chalk.green('build-tool')} generator!`
    ));
  },
  prompting: function() {
    const questions = [
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

    return this.prompt(questions).then((answers) => {
      options.projectName = answers.projectName;
      options.builder = answers.builder;
      options.styles = anwsers.styles;
    });
  },
  writing: function() {
    files.push(`${_.capitalize(options.builder)}file.js`);

    files.push({
      src: `${options.builder}/tasks`,
      dst: 'build/tasks'
    }, {
      src: `${options.builder}/custom/${options.styles}.js`,
      dst: 'build/tasks/${options.styles}.js'
    });

    files.forEach((file) => {
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
  end: function() {
    this.log('All done, time to build!');
  }
});
