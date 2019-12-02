const httpStatus = require('http-status')
const Sequelize = require('sequelize')
const { log } = require('../utils/logger')
const PatientValidationError = require('../utils/patientValidationError')

const asyncWrap = function (fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (e) {
      log.error(e)
      if (e instanceof Sequelize.ValidationError || e instanceof Sequelize.DatabaseError) {
        log.error('An error occured processing request', e.parent.code, e.message)
        switch (e.parent.code) {
          case 'ER_DUP_ENTRY' : res.status(httpStatus.BAD_REQUEST).send({ message: 'Entity contains duplicate entry' })
            break
          case 'ER_NO_DEFAULT_FOR_FIELD' : res.status(httpStatus.BAD_REQUEST).send({ message: 'The request entity was missing a required field' })
            break
          case 'ER_NO_REFERENCED_ROW_2' : res.status(httpStatus.BAD_REQUEST).send({ message: 'The request entity cannot find a matching parent reference' })
            break
          default : res.status(httpStatus.BAD_REQUEST).send({ message: 'There were errors in the request. Please see API documentation for correct request format.  Explicit validation messages to be added in future versions.' })
        }
      } else if (e instanceof PatientValidationError) {
        res.status(httpStatus.BAD_REQUEST).send({ message: e.message })
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'The was an error processing the request.  Please try again later.' })
      }
    }
  }
}

const timeRequest = async (req, res, next) => {
  const { params, query, body, path } = req
  log.debug(`Handling request to ${path}`)
  const start = Date.now()
  res.on('finish', function () {
    const duration = Date.now() - start
    const { body: responseBody, code } = res
    log.debug(`Request to ${path} took ${duration} milliseconds`, { requestDetails: { params, query, body } }, { responseDetails: { responseBody, code } })
  })
  next()
}

module.exports = {
  asyncWrap, timeRequest
}
