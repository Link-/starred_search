import arg from 'arg'
const main = require('./main.js');
const pkg = require('../package.json');

const help = `
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

  -l, --limit <number>
    Limit the search results to the specified number. Default is 10
    
  -V, --verbose
    Outputs debugging log

  -v, --version
    Outputs release version
`

const parseArgs = (rawArgs) => {
  const args = arg(
    {
      // Types
      '--help': Boolean,
      '--user': String,
      '--find': String,
      '--cache-dir': String,
      '--limit': Number,
      '--verbose': Boolean,
      '--version': Boolean,
      // Aliases
      '-h': '--help',
      '-u': '--user',
      '-f': '--find',
      '-c': '--cache-dir',
      '-l': '--limit',
      '-V': '--verbose',
      '-v': '--version'
    }
  )
  return {
    help: args['--help'],
    user: args['--user'],
    findParam: args['--find'],
    cacheDir: args['--cache-dir'] || '.cache',
    limit: args['--limit'] || 10,
    verbose: args['--verbose'] || false,
    version: args['--version'] || false,
  }
}

export const cli = (args) => {
  let options = parseArgs(args)

  // Display commands guide
  if (options.help) {
    console.log(help)
    return
  }
  // Display version
  if (options.version) {
    console.log(pkg.version)
    return
  }

  // Trigger the search
  main.search(options);
}