# starred_search
> Search your starred repositories on GitHub for a keyword.

You know those repositories you like and star into the abyss? Yes those, this cli tool will help you do a fuzzy search on them. You can search any GitHub user's starred repositories by providing their handle only.

This tool will cache the results locally so that you don't risk abusing the API requests limit.

## Installation

### Minimum Requirements

- [ ] Node **v12.x.x+**

### Setup 

OS X & Linux:

```sh
# Install
npm install starred_search -g

# Usage
starred_search --user 'link-' --cache-dir '/tmp/.cache' --find 'es6'
```

I recommend that you create an alias in your shell to avoid repeating the required parameters. Example alias in fish:

```
# Create an alias (this is temporary, you might want to make it permanent)
alias stars="./starred_search --user 'link-' --cache-dir '/tmp/.cache'"

# Then you can use it as:
stars -f 'es6'
```

## Usage

```
starred_search
    --user <handle>
        Any GitHub handle. Example: link-

    --cache-dir <directory>
        Directory you want to store the cache file in. Example: /tmp/.cache

    --find <keyword>
        The keyword you want to search for. Example: es6
```

### Example output

```
starred_search --user 'link-' --cache-dir '/tmp/.cache' --find 'es6'

🕵    INFO: Searching for "es6" in "link-'s" starred catalogue
⚠️    INFO:: Serving search results from cache
{
  repo_name: 'lukehoban/es6features',
  repo_description: 'Overview of ECMAScript 6 features',
  repo_url: 'https://github.com/lukehoban/es6features',
  repo_stars: 27640
}
{
  repo_name: 'google/sa360-flightsfeed',
  repo_description: 'Generate SA360 compatible feeds for airlines on BigQuery  :rocket:',
  repo_url: 'https://github.com/google/sa360-flightsfeed',
  repo_stars: 8
}
{
  repo_name: 'DrkSephy/es6-cheatsheet',
  repo_description: 'ES2015 [ES6] cheatsheet containing tips, tricks, best practices and code snippets',
  repo_url: 'https://github.com/DrkSephy/es6-cheatsheet',
  repo_stars: 11408
}
```

## Release History

* 0.0.1
    * Work in progress

## Contributing

1. Fork it (<https://github.com/yourname/yourproject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request