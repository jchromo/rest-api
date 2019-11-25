const httpStatus = require('http-status')
const Sequelize = require('sequelize')
const asyncWrap = function (fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (e) {
      console.error('!!!!!!!!!!!CODE!!!!!!!!!!!', e.parent.code, e)
      if (e instanceof Sequelize.ValidationError || e instanceof Sequelize.DatabaseError) {
        if (e.parent.code === 'ER_DUP_ENTRY') {
          res.status(httpStatus.BAD_REQUEST).send({ message: 'Entity contains duplicate entry' })
        } else if (e.parent.code === 'ER_NO_DEFAULT_FOR_FIELD') {
          res.status(httpStatus.BAD_REQUEST).send({ message: 'Missing Field' })
        } else if (e.parent.code === 'ER_BAD_FIELD_ERROR3') {
          res.status(httpStatus.BAD_REQUEST).send({ message: 'Unkown Field' })
        } else {
          res.status(httpStatus.BAD_REQUEST).send({ message: 'There were errors in the request. Please see API documentation for correct request format.  Validation messages to be added in future versions.' })
        }
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send('The was an error processing the request.  Please try again later.')
      }
    }
  }
}
module.exports = {
  asyncWrap
}
