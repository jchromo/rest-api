const { asyncWrap } = require('../lib/middlewares')
const {
  PatientController
} = require('../controllers')

const patients = function ({ router }) {
  // ItemList
  router.post('/',
    // validateSchema(Items.schema),
    asyncWrap(PatientController.post)
  )
  router.get('/',
    // validateSchema(Items.schema),
    asyncWrap(PatientController.get)
  )
  return router
}

module.exports = {
  patients
}
