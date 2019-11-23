const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const compression = require('compression')
const responseTime = require('response-time')
// const { errorMiddleware, requestMiddleware, responseMiddleware, userAuth0Middleware, prometheus } = require('./lib/middleware')
const routers = require('./routers')
const helmet = require('helmet')

const DEFAULT_CONFIGURATION = {
  port: 3000,
  host: '0.0.0.0'
}

module.exports = class ExpressServer {
  constructor ({ configuration, logger, isLocal }) {
    // this.config = configuration
    this.config = { ...configuration, DEFAULT_CONFIGURATION }
    console.log('CREATING!!!!')
    this.instance = express()
    this.logger = logger
    this.isLocal = isLocal
  }

  handleInstanceStarted () {
    // this.logger.info(`Server instance started on ${this.config.port}`)
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

  addRequestHandlerMiddleware () {
    return this
  };

  addResponseHandlerMiddleware () {
    return this
  };

  start () {
    console.log(`Listening on: ${this.config.APP_PORT}`)
    this.instance.listen(this.config.APP_PORT, this.handleInstanceStarted.bind(this))
    return this
  }

  processListener () {
    return this
  }

  registerRoutes () {
    const version = 'v1'
    Object.keys(routers).forEach((name) => {
      const route = `/${version}/${name}`
      console.log(`Registering versioning router [${name}] at ${route}...`)
      this.addRoute(route, routers[name])
    })
    return this
  }

  // private functions
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
