const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const compression = require('compression')
const responseTime = require('response-time')
const { log } = require('./utils/logger')
const { timeRequest } = require('./lib/middleware')
const routers = require('./routers')
const helmet = require('helmet')

const DEFAULT_CONFIGURATION = {
  port: 3000,
  host: '0.0.0.0'
}

module.exports = class ExpressServer {
  constructor ({ configuration }) {
    this.config = { ...configuration, DEFAULT_CONFIGURATION }
    this.instance = express()
    this.log = log
  }

  handleInstanceStarted () {
    this.log.info(`Server instance started on ${this.config.APP_PORT}`)
  };

  asWebService () {
    this.instance.use(compression())
    this.instance.use(cors())
    this.instance.use(bodyParser.urlencoded({ extended: true }))
    this.instance.use(bodyParser.json())
    this.instance.use(morgan('combined', { immediate: true }))
    this.instance.use(responseTime())
    this.instance.use(helmet())
    return this
  }

  addTimerMiddleware () {
    this.instance.use(timeRequest)
    return this
  };

  start () {
    log.info(`Listening on: ${this.config.APP_PORT}`)
    this.instance.listen(this.config.APP_PORT, this.handleInstanceStarted.bind(this))
    return this
  }

  registerRoutes () {
    const version = 'v1'
    Object.keys(routers).forEach((name) => {
      const route = `/${version}/${name}`
      log.info(`Registering versioning router [${name}] at ${route}...`)
      this.addRoute(route, routers[name])
    })
    return this
  }

  addRoute (prefix, routeConfig) {
    this.instance.use(
      prefix,
      routeConfig({
        router: express.Router()
      })
    )
    return this
  }
}
