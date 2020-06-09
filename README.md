# ldapfaker
> NodeJS script to generate a fake LDIF that can be imported to any AD solution for testing purposes

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

## Release History

* 0.0.1
    * Work in progress

## Contributing

1. Fork it (<https://github.com/yourname/yourproject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request