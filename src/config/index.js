const { name, version } = require('../../package.json')

const {
  NODE_HOST,
  NODE_PORT,
  NODE_ADMIN_PORT,
  NODE_ENV = 'local',
  NODE_GRPC_HOST,
  NODE_GRPC_PORT,
  APP_NAME,
  LOG_LEVEL,
  METRICS_ENDPOINT,
  JWKS_URI: JWKS_URI = 'https://enablement-solution-dev.auth0.com/.well-known/jwks.json'
} = process.env

const APP_PORT = Number(NODE_PORT) || 8080
const ADMIN_PORT = Number(NODE_ADMIN_PORT) || 8081
const env = NODE_ENV || 'local'
const appName = APP_NAME || name

const config = {
  env,
  APP_PORT,
  LoggerConfig: {
    name: appName,
    level: LOG_LEVEL || 'info'
    // mode: LOG_MODES.SHORT
  },
  MonitoringConfig: {
    port: ADMIN_PORT,
    endpoint: `/${METRICS_ENDPOINT || 'metrics'}`,
    customLabels: {
      name: appName,
      version
    }
  }
}

module.exports = config
