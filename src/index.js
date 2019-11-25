const ExpressServer = require('./expressServer')
const configuration = require('./config')
// const models = require('./models')

// models.sequelize.sync().then(() => {
//   new ExpressServer({
//     configuration
//   })
//     .asWebService()
//     .registerRoutes()
//     .addResponseHandlerMiddleware()
//     .start()
// })

new ExpressServer({
  configuration
})
  .asWebService()
  .registerRoutes()
  .addResponseHandlerMiddleware()
  .start()
