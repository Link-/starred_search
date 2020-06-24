const axios = require('axios');
const path = require('path');
const chalk = require('chalk');
const flatCache = require('flat-cache');
const MurmurHash3 = require('imurmurhash');
const FuzzySearch = require('fuzzy-search');

// GitHub's API endpoint
const gh_starred_endpoint = 'https://api.github.com/users/{{USER}}/starred';
// Maximum pages per request this limitation is imposed by GitHub's 
// REST API, more information here: https://developer.github.com/v3/#pagination
const max_pages_per_request = 100;

/**
 * Checks whether the needed paramters have been provided
 *
 * user and findParam are required
 * 
 * Throws an exception otherwise
 * 
 * @param options 
 */
const validate_parameters = (options) => {
  if (options.user === undefined || options.findParam === undefined) {
      throw new Error('--user and --find parameters are both mandatory');
    }
  else if (options.user == '' || options.findParam == '')
    throw new Error('--user and --find parameters are both mandatory');

  return;
}

/**
 * Replace the placeholder with the user's handle
 * options.user maps to the user argument
 * 
 * @param options 
 */
const construct_api_url = (options) => {
  return gh_starred_endpoint.replace('{{USER}}', options.user);
}

/**
 * Parses the `link` response header to calculate the number of pages
 * based on a maximum of 100 items per page
 * 
 * @param {*} options 
 */
const calculate_pages = (options) => {
  return axios({
    method: 'get',
    url: `${construct_api_url(options)}?per_page=1`,
    headers: {
      'User-Agent': 'Starred-Search Node.js module'
    },
  })
    .then((response) => {
      let pages = {};
      // The GitHub API handles pagine in the header item "link". More details 
      // about that here: https://developer.github.com/v3/#pagination
      pages['total'] = /page=(?<last_page>[0-9]+)>; rel="last"/.exec(response.headers['link']).groups['last_page'];
      pages['number_of_pages'] = Math.ceil(pages['total']/100);
      return pages;
    });
}

/**
 * Fetch a given page of starred repos meta-data
 * 
 * @param {*} options 
 * @param {*} page_number 
 */
const fetch_page = (options, page_number) => {
  return axios({
    method: 'get',
    url: `${construct_api_url(options)}?per_page=${max_pages_per_request}&page=${page_number}`,
    headers: {
      'User-Agent': 'Starred-Search Node.js module'
    },
  })
    .then((response) => {
      return response.data;
    });
}

/**
 * Loops over the provided number of pages and fetches all the pages of 
 * starred repositories for a given user
 * 
 * @param options 
 */
const fetch_starred_repos = (options, pages) => {
  // Array containing all the promises (each promise is for fetching
  // only 1 page)
  let pageRequests = [];

  for (let page = 1; page <= pages.number_of_pages; page++) {
    pageRequests.push(fetch_page(options, page));
  }

  return Promise.all(pageRequests);
}

/**
 * Validates parameters and searches the list of starred repositories for 
 * the value of findParam. 
 * 
 * This method will also caches the fetched results to avoid abusing the GitHub
 * API rate limits.
 * 
 * If no cache entry was found, a new one will be created at the specified 
 * cacheDir
 * 
 * if cacheDir is not provided it will assume a default value of: ../.cache
 * 
 * @param {*} options 
 */
const search = (options) => {
  (options.verbose) ? console.log(chalk.bold.green(`🕵    INFO: Searching for "${options.findParam}" in "${options.user}'s" starred catalogue`)) : null;
  validate_parameters(options);

  return calculate_pages(options)
    .then((pages) => {
      /**
       * Create a unique hash composed of the User's handle and the number of repos
       * they have starred. If they star new repos, the hash will change and the
       * search will not happen on cached data.
       * 
       * New data will be fetched and persisted on disk for future searches.
       */
      let cacheHash = MurmurHash3(options.user).hash(pages.number_of_pages).result();
      let cache = flatCache.load(`${cacheHash}`, path.resolve(options.cacheDir));
      if (cache._persisted.data === undefined || Object.keys(cache._persisted).length == 0) {
        (options.verbose) ? console.log(chalk.bold.green('✅    INFO:: Cache is empty, fetching data from GitHub')) : null;
        return fetch_starred_repos(options, pages)
          .then((data) => {
            cache.setKey('data', data);
            cache.save();
            return data;
          });
      } else {
        (options.verbose) ? console.log(chalk.bold.red('⚠️    INFO:: Serving search results from cache')) : null;
        return cache.getKey('data');
      }
    })
    .then((data) => {
      /**
       * First we flatten the data array (it's 2 dimentional because of pagination)
       * then we do a fuzzy search only in the 'full_name, description and homepage'
       * fields.
       */
      const searcher = new FuzzySearch(data.flat(), ['full_name', 'description', 'homepage'], {
        caseSensitive: false,
      });
      const results = searcher.search(options.findParam);
      // Display the results
      results.forEach((item) => {
        let output = {
          repo_name: item.full_name,
          repo_description: item.description,
          repo_url: item.html_url,
          repo_stars: item.stargazers_count
        }
        console.log(JSON.stringify(output, null, 2));
      });
    });
}

module.exports = {
  validate_parameters, 
  construct_api_url, 
  calculate_pages,
  fetch_page, 
  fetch_starred_repos,
  search
}