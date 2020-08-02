import arg from 'arg'
const main = require('./main.js');

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

  -v, --verbose
    Outputs debugging log
`

const parseArgs = (rawArgs) => {
  const args = arg(
    {
      // Types
      '--help': Boolean,
      '--user': String,
      '--find': String,
      '--cache-dir': String,
      '--verbose': Boolean,
      // Aliases
      '-h': '--help',
      '-u': '--user',
      '-f': '--find',
      '-c': '--cache-dir',
      '-v': '--verbose'
    }
  )
  return {
    help: args['--help'],
    user: args['--user'],
    findParam: args['--find'],
    cacheDir: args['--cache-dir'] || '.cache',
    verbose: args['--verbose'] || false
  }
}

export const cli = (args) => {
  let options = parseArgs(args)

  if (options.help) {
    console.log(help)
    return
  }

  // Trigger the search
  main.search(options);
}