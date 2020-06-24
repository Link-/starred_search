import arg from 'arg'
const main = require('./main.js');

const parseArgs = (rawArgs) => {
  const args = arg(
    {
      // Types
      '--user': String,
      '--find': String,
      '--cache-dir': String,
      '--verbose': Boolean,
      // Aliases
      '-u': '--user',
      '-f': '--find',
      '-c': '--cache-dir',
      '-v': '--verbose'
    }
  )
  return {
    user: args['--user'],
    findParam: args['--find'],
    cacheDir: args['--cache-dir'] || '../.cache',
    verbose: args['--verbose'] || false
  }
}

export const cli = (args) => {
  let options = parseArgs(args)

  // Trigger the search
  main.search(options);
}