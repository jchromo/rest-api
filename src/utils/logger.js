const bunyan = require('bunyan')

let log

if (!log) {
  log = bunyan.createLogger({
    name: 'rest-api',
    level: process.env.LOG_LEVEL
  })
}

module.exports = { log }
