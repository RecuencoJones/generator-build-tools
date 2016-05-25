module.exports = {
  pkg: require('../../package.json'),
  source: {
    app: 'app',
    build: 'build',
    dist: 'dist',
    doc: 'doc',
    test: 'test',
    tmp: 'tmp'
  },
  test: {
    testTypes: ['unit', 'tdd', 'coverage'],
    browsers: ['chrome', 'firefox'],

    // place your remote selenium server address here
    seleniumAddress: 'http://host:4444/wd/hub'
  }
};
