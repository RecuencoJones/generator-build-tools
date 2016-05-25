var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  Promise = require('es6-promise').Promise,
  testPath = 'tmp/test';

/**
 * Reads file from given path.
 *
 * @param {Path} filePath - file to read.
 * @returns {Promise.<string>} promise handler. Resolves contents of file.
 */
function read(filePath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, function(error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

/**
 * Writes data to given path.
 *
 * @param {Path} filePath - path to save the data.
 * @param {string} data - contents of file.
 * @returns {Promise.<void>} promise handler.
 */
function write(filePath, data) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(filePath, data, function(error) {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Creates test index file from test template.
 *
 * @param {Path} basePath - path of test case.
 * @param {string} templateFile - filename of test template.
 * @returns {Promise.<Path>} - Path
 */
function setTestTemplate(basePath, templateFile) {
  var outputPath = path.join(testPath, 'index.html'),
    compile;

  return read(path.join(testPath, 'index.ejs'))
  .then(function(index) {
    compile = _.template(index);

    return read(path.join(basePath, templateFile));
  })
  .then(function(template) {
    var compiled = compile({
      test: {
        template: template
      }
    });

    return Promise.resolve(compiled);
  })
  .then(function(output) {
    return write(outputPath, output);
  })
  .then(function() {
    return Promise.resolve(path.join(browser.baseUrl,
      path.resolve(outputPath)));
  });
}

global.flows = require('../utils/functional-flows');
global.utils = require('../utils/utils');
global.path = require('path');
global.chai = require('chai');
global.sinon = require('sinon');
global.expect = global.chai.expect;
global.setTestTemplate = setTestTemplate;

global.chai.use(require('sinon-chai'));

beforeEach(function() {});

afterEach(function() {});
