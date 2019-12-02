const { asyncWrap } = require('../lib/middleware')
const {
  PatientController
} = require('../controllers')

const patients = function ({ router }) {
  router.post('/',
    asyncWrap(PatientController.post)
  )
  router.get('/:source/:medicalRecordNumber',
    asyncWrap(PatientController.get)
  )
  router.get('/:id',
    asyncWrap(PatientController.get)
  )
  router.patch('/:source/:medicalRecordNumber',
    asyncWrap(PatientController.patch)
  )
  router.delete('/:source/:medicalRecordNumber',
    asyncWrap(PatientController.delete)
  )
  return router
}

module.exports = {
  patients
}
