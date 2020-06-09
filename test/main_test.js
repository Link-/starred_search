const main = require('../src/main.js');
const assert = require('chai').assert;
const suite = require('mocha').suite;
const test = require('mocha').test;

suite('starred-search Core Tests', () => {
  test('construct_api_url() - successful construction', () => {
    const options = {
      user: 'SomeUser',
      find: 'nodejs cache'
    };

    const expected = 'https://api.github.com/users/SomeUser/starred';

    assert.equal(main.construct_api_url(options), expected);
  });

  test.skip('validate_parameters() - should not accept empty user', () => {
    const options = {
      user: '',
      find: 'nodejs cache'
    };

    const expectedError = new Error('--user and --find parameters are both mandatory');

    assert.throws(() => {
      main.validate_parameters(options)
    }, expectedError);
  });

  test.skip('validate_parameters() - should not accept empty find parameter', () => {});

  test.skip('validate_parameters() - should not accept empty user || find parameters', () => {});

  test.skip('fetch_page() - should successfully fetch a given page', () => {
    const options = {
      user: 'Link-',
      find: 'nodejs cache'
    };

    const page_number = 2;

    main.fetch_page(options, page_number)
      .then((response) => {
        console.log(response);
      });
  });

  test.skip('fetch_starred_repos() - should successfully fetch all pages and return a well formatted array', () => {
    const options = {
      user: 'Link-',
      find: 'nodejs cache'
    };

    main.fetch_starred_repos(options)
      .then((response) => {
        console.log(response)
      });
  });
});