const ExpressServer = require('./expressServer')
const configuration = require('./config')

new ExpressServer({ configuration })
  .asWebService()
  .addTimerMiddleware()
  .registerRoutes()
  .start()
