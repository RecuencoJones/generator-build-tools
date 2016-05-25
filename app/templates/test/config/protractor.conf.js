var _ = require('lodash'),
  utils = require('../utils/utils'),
  connect = require('connect'),
  ip = require('ip'),
  serveStatic = require('serve-static'),
  BROWSER_TIMEOUT = 20000,
  LOCAL_PORT = 27453,
  LOCAL_ADDR = ip.address();

/**
 * Returns the protractor configuration of the specific browsre.
 * @param {string} browserName - browser name.
 * @return {Object} Protractor configuration.
 */
module.exports = function(browserName) {
  return {
    specs: [
      './protractor-globals.js',
      '../specs/functional/**/*.spec.js'
    ],
    baseUrl: 'http://${addr}:${port}/tmp/test/index.html'
      .replace('${addr}', LOCAL_ADDR)
      .replace('${port}', LOCAL_PORT),
    framework: 'mocha',
    allScriptsTimeout: BROWSER_TIMEOUT,
    getPageTimeout: BROWSER_TIMEOUT,
    capabilities: {
      browserName: browserName
    },
    mochaOpts: {
      reporter: 'mochawesome',
      reporterOptions: {
        reportDir: 'test/results/functional/${browser}'.replace('${browser}',
          browserName),
        reportName: 'functional-test-report',
        reportTitle: 'Uic Context Menu: functional tests report (${browser})'
          .replace('${browser}', _.capitalize(browserName)),
        inlineAssets: false
      },
      timeout: BROWSER_TIMEOUT
    },
    beforeLaunch: function() {
      connect().use(serveStatic('./')).listen(LOCAL_PORT);
    },
    onPrepare: function() {
      browser.ignoreSynchronization = true;

      by.addLocator('match', utils.matchLocator);
    }
  };
};
