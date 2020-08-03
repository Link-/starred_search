# starred_search
> Search your starred repositories on GitHub for a keyword.

_Notice: This project is still in `alpha` and the API might change without notice. Update only after reviewing the changelog for breaking changes._

You know those repositories you like and star into the abyss? Yes those, this cli tool will help you do a fuzzy search on them. You can search any GitHub user's starred repositories by providing their handle only.

This tool will cache the results locally so that you don't risk abusing the API requests limit.

!["Starred Search Demo"](./_assets/demo_v2.gif)

## Installation

### Minimum Requirements

- Node **v12.x.x+**

### Setup 

OS X & Linux:

```sh
# Install
npm install starred_search -g

# Usage
starred_search --user 'link-' --cache-dir '/tmp/.cache' --find 'es6'
```

I recommend that you create an alias in your shell to avoid repeating the required parameters. 

Example alias in fish and bash:
```
# Create an alias (this is temporary, you might want to make it permanent)
alias stars="starred_search --user 'link-' --cache-dir '/tmp/.cache'"

# Then you can use it as:
stars -f 'es6'
```

## Usage

```
starred_search
    -h, --help
        Show this message and exit.

    -u, --user <handle>
        Any GitHub handle. Example: link-

    -c, --cache-dir <directory>
        Directory you want to store the cache file in. Example: /tmp/.cache

    -f, --find <keyword>
        The keyword you want to search for. Example: es6

    -v, --verbose
        Outputs debugging log
```

### Example output

**Non-verbose Output:**
```
$: starred_search --user 'link-' --find 'es6'

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

**Verbose Output:**
```
$: starred_search --user 'link-' --cache-dir '/tmp/.cache' --find 'es6' --verbose

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
```
# Return the first search result only
$: starred_search -u 'link-' -f 'es6' | jq '.[0]'

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

* 0.1.8
  * Change alias for --verbose from -v to -V
  * Add -v, --version option
* 0.1.7
  * Added -h, --help option
  * Added -l, --limit option to limit the search results
* 0.1.6
  * Added aliases to documentation
* 0.1.5
  * **API BREAKING CHANGES**
  * Add verbose flag
  * Fix output to return valid JSON
  * Fix output to return results in an array instead of separated objects
* 0.1.0 - 0.1.4
  * Basic functionality