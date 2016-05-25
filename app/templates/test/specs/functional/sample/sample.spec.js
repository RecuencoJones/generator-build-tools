describe('Sample suite', function() {
  beforeEach(function() {
    return setTestTemplate(__dirname, 'sample.html')
    .then(function() {
      return browser.driver.get(browser.baseUrl);
    });
  });

  it('should pass a simple test', function() {
    expect(true).to.be.true;
  });
});
