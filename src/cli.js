#!/usr/bin/env node
const arg = require('arg');
const main = require('./main.js');
const pkg = require('../package.json');
const chalk = require('chalk');
const cachedir = require('cachedir');

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
  
  -o, --org <org name>  (optional)
    GitHub organisation name. Example: GitHub

  -l, --limit <number>
    Limit the search results to the specified number. Default is 10
    
  -V, --verbose
    Outputs debugging log

  -v, --version
    Outputs release version

  -d, --debug
    Outputs stack trace in case an exception is thrown
`

const parseArgs = (rawArgs) => {
  const args = arg(
    {
      // Types
      '--debug': Boolean,
      '--help': Boolean,
      '--user': String,
      '--find': String,
      '--org': String,
      '--cache-dir': String,
      '--limit': Number,
      '--verbose': Boolean,
      '--version': Boolean,
      // Aliases
      '-d': '--debug',
      '-h': '--help',
      '-u': '--user',
      '-f': '--find',
      '-o': '--org',
      '-c': '--cache-dir',
      '-l': '--limit',
      '-V': '--verbose',
      '-v': '--version',
    }
  )
  return {
    debug: args['--debug'] || false,
    help: args['--help'],
    user: args['--user'],
    findParam: args['--find'],
    organization: args['--org'],
    cacheDir: args['--cache-dir'] || cachedir('starredsearch'),
    limit: args['--limit'] || 10,
    verbose: args['--verbose'] || false,
    version: args['--version'] || false,
  }
}

const appendEnvVariables = (options) => {
  if (process.env.GITHUB_TOKEN) {
    console.log(chalk.bold.green('🔑  INFO: Using GITHUB_TOKEN environment variable'));
    options.ghtoken = process.env.GITHUB_TOKEN;
  }
  return options
}

const cli = (args) => {
  let options = parseArgs(args)
  options = appendEnvVariables(options)

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
  try {
    main.search(options);
  } catch (error) {
    if (!options.debug) {
      console.error(chalk.bold.red(`🛑  ${error.message}`));
    } else {
      console.error(error);
    }
  }
}

cli(process.argv);
