const { name } = require('../../package.json')

const {
  NODE_PORT,
  NODE_ENV = 'local',
  APP_NAME,
  LOG_LEVEL
} = process.env

const APP_PORT = Number(NODE_PORT) || 8080
const env = NODE_ENV || 'local'
const appName = APP_NAME || name

const config = {
  env,
  APP_PORT,
  LoggerConfig: {
    name: appName,
    level: LOG_LEVEL || 'info'
    // mode: LOG_MODES.SHORT
  }
}

module.exports = config
