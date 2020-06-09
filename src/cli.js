import arg from 'arg'
const main = require('./main.js');

const parseArgs = (rawArgs) => {
  const args = arg(
    {
      // Types
      '--user': String,
      '--find': String,
      '--cache-dir': String,
      // Aliases
      '-u': '--user',
      '-f': '--find',
      '-c': '--cache-dir'
    }
  )
  return {
    user: args['--user'],
    findParam: args['--find'],
    cacheDir: args['--cache-dir'] || '../.cache'
  }
}

export const cli = (args) => {
  let options = parseArgs(args)

  // Trigger the search
  main.search(options);
}