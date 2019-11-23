const ExpressServer = require('./expressServer')
const configuration = require('./config')
new ExpressServer({
  configuration
})
  .asWebService()
// .addRequestHandlerMiddleware()
  .registerRoutes()
  .addResponseHandlerMiddleware()
  .start()
