```sh
✴    ✴   ✴              ✴       ✴              ✴                ✴
  ✴  _      ✴      ✴   ✴        _    ✴              ✴   ✴     _   ✴  
 ___| |_ __ _ _✴__ _ __ ___  __| |    ___ ✴___  __ _ _✴__ ___| |__  
/ __| __/ _` | '✴_| '__/ _ \/ _` |  ✴/ __|/ _ \/✴_` | '__/ __| '_ \✴
\__ \ || (✴| |✴|  | | |  __/ (_| | ✴ \__ \  __/ (_| | | | (__| |✴| |✴
|___/\__\__,_|_|  |_| ✴\___|\__,_|___|___/\___|\__✴_|_| ✴\___|_| |_|
          ✴            ✴        |_____|      ✴       ✴               
```

> Search your starred ★ repositories on GitHub from your terminal

[![npm](https://img.shields.io/npm/v/starred_search?style=flat-square)](https://www.npmjs.com/package/starred_search) [![npm](https://img.shields.io/npm/dm/starred_search?style=flat-square)](https://www.npmjs.com/package/starred_search) [![GitHub](https://img.shields.io/github/license/link-/starred_search?style=flat-square)](./LICENSE)

You know those repositories you like and star into the abyss? Yes those, this cli tool will help you do a fuzzy search on them. You can search any GitHub user's starred repositories by providing their handle only.

This tool will cache the results locally so that you don't risk abusing the API requests limit.

!["Starred Search Demo"](./_assets/starred_search.gif)

**Notice:** This project is still in `alpha` and the API might change without notice. Update only after reviewing the changelog for breaking changes.

## Installation

### Minimum Requirements

- 🐧 Linux
- 🍎 macOS
- 📦 Node `v12.x.x+`

### Setup

```sh
# Install
npm install starred_search -g

# Usage
starred_search --user 'link-' --find 'es6'
```

I recommend that you create an alias in your shell to avoid repeating the required parameters.

Example alias in fish and bash:

```sh
# Create an alias (this is temporary, you might want to make it permanent)
alias stars="starred_search --user 'link-'"

# Then you can use it as:
stars -f 'es6'
```

## Usage

```sh
Usage: starred_search [OPTIONS] [ARGS]...

  Search your or any other user's starred repositories on GitHub for a keyword.

Options:
  -h, --help
    Show this message and exit.

  -u, --user <handle>
    Any GitHub handle. Example: link-

  -c, --cache-dir <directory>
    Directory you want to store the cache file in. Example: /tmp/.cache

  -f, --find <keyword>
    The keyword you want to search for. Example: es6

  -o, --org <org name>  (optional)
    Any GitHub Organisation Name. Example: GitHub

  -l, --limit <number>
    Limit the search results to the specified number. Default is 10

  -V, --verbose
    Outputs debugging log

  -v, --version
    Outputs release version

  -d, --debug
    Outputs stack trace in case an exception is thrown
```

### Examples

**Non-verbose output:**

```sh
$ starred_search --user 'link-' --find 'es6'

[
  {
    "repo_name": "lukehoban/es6features",
    "repo_description": "Overview of ECMAScript 6 features",
    "repo_url": "https://github.com/lukehoban/es6features",
    "repo_stars": 27672
  },
  {
    "repo_name": "google/sa360-flightsfeed",
    "repo_description": "Generate SA360 compatible feeds for airlines on BigQuery  :rocket:",
    "repo_url": "https://github.com/google/sa360-flightsfeed",
    "repo_stars": 8
  },
  {
    "repo_name": "DrkSephy/es6-cheatsheet",
    "repo_description": "ES2015 [ES6] cheatsheet containing tips, tricks, best practices and code snippets",
    "repo_url": "https://github.com/DrkSephy/es6-cheatsheet",
    "repo_stars": 11410
  }
]
```

**Verbose output & override cache directory:**

```sh
$ starred_search --user 'link-' --cache-dir '/tmp/.cache' --find 'es6' --verbose

🕵    INFO: Searching for "es6" in "link-'s" starred catalogue
⚠️    INFO:: Serving search results from cache
[
  {
    "repo_name": "lukehoban/es6features",
    "repo_description": "Overview of ECMAScript 6 features",
    "repo_url": "https://github.com/lukehoban/es6features",
    "repo_stars": 27672
  },
  {
    "repo_name": "google/sa360-flightsfeed",
    "repo_description": "Generate SA360 compatible feeds for airlines on BigQuery  :rocket:",
    "repo_url": "https://github.com/google/sa360-flightsfeed",
    "repo_stars": 8
  },
  {
    "repo_name": "DrkSephy/es6-cheatsheet",
    "repo_description": "ES2015 [ES6] cheatsheet containing tips, tricks, best practices and code snippets",
    "repo_url": "https://github.com/DrkSephy/es6-cheatsheet",
    "repo_stars": 11410
  }
]
```

**Parsing the output with jq**
You can pipe the standard output to be handled by tools like [jq](https://stedolan.github.io/jq/) for more magic:

```sh
# Return the first search result only
$ starred_search -u 'link-' -f 'es6' | jq '.[0]'

{
  "repo_name": "lukehoban/es6features",
  "repo_description": "Overview of ECMAScript 6 features",
  "repo_url": "https://github.com/lukehoban/es6features",
  "repo_stars": 27672
}

# Return repo_name of every result element
starred_search -u 'link-' -f 'es6' | jq 'map(.repo_name)'

[
  "lukehoban/es6features",
  "google/sa360-flightsfeed",
  "DrkSephy/es6-cheatsheet"
]
```

## Release History

- 0.1.12
  - [x] Update packages to resolve security vulnerabilities
- 0.1.11
  - [x] Fix `repo_url` value to reference the Repository's GitHub URL
  - [x] Default homepage_url to `N.A`
- 0.1.10
  - [x] Add release workflow
  - [x] Add [contributing guide](./CONTRIBUTING.md)
- 0.1.9
  - [x] Replaced the flaky fuzzy search with an enhanced full text search
  - [x] Updated cache invalidation logic to rely on etags
  - [x] Add -d, --debug option
  - [x] Automatic discovery of cache directory based on OS
  - [x] Updates user agent for API requests
- 0.1.8
  - [x] **API BREAKING CHANGES**
  - [x] Change alias for --verbose from -v to -V
  - [x] Add -v, --version option
- 0.1.7
  - [x] Added -h, --help option
  - [x] Added -l, --limit option to limit the search results
- 0.1.6
  - [x] Added aliases to documentation
- 0.1.5
  - [x] **API BREAKING CHANGES**
  - [x] Add verbose flag
  - [x] Fix output to return valid JSON
  - [x] Fix output to return results in an array instead of separated objects
- 0.1.0 - 0.1.4
  - [x] Basic functionality
