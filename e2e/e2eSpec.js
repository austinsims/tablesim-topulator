/**
 * Runs all end to end tests
 */

describe('End to end tests for cards', function() {

  it('should render the root', function() {
    browser().navigateTo('/');
    expect(element('title').text()).toBe("Tablesim Topulator");
  });

});