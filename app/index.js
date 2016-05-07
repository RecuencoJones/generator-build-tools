const generators = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const files = [];
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
  writing: function() {
    files.forEach((file) => {
      let src, dst;

      if (typeof file === 'string') {
        src = file;
        dst = file;
      } else {
        src = file.src;
        dst = file.dst;
      }
    });

    this.fs.copyTpl(
      this.templatePath(src),
      this.destinationPath(dst),
      options
    );
  },
  end: function() {
    this.log('All done, time to build!');
  }
});
