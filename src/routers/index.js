const { asyncWrap } = require('../lib/middlewares')
const {
  PatientController,
  PatientMemberRecordController,
  AddressController
} = require('../controllers')

const patients = function ({ router }) {
  router.post('/',
    asyncWrap(PatientController.post)
  )
  router.get('/',
    asyncWrap(PatientController.get)
  )
  router.get('/:id',
    asyncWrap(PatientController.get)
  )
  router.patch('/:id',
    asyncWrap(PatientController.patch)
  )
  router.delete('/:id',
    asyncWrap(PatientController.delete)
  )
  return router
}

const addresses = function ({ router }) {
  router.post('/',
    asyncWrap(AddressController.post)
  )
  router.get('/',
    asyncWrap(AddressController.get)
  )
  router.get('/:id',
    asyncWrap(AddressController.get)
  )
  router.patch('/:id',
    asyncWrap(AddressController.patch)
  )
  router.delete('/:id',
    asyncWrap(AddressController.delete)
  )
  return router
}

const patientMemberRecords = function ({ router }) {
  router.post('/',
    asyncWrap(PatientMemberRecordController.post)
  )
  router.get('/',
    asyncWrap(PatientMemberRecordController.get)
  )
  router.get('/:id',
    asyncWrap(PatientMemberRecordController.get)
  )
  router.patch('/:id',
    asyncWrap(PatientMemberRecordController.patch)
  )
  router.delete('/:id',
    asyncWrap(PatientMemberRecordController.delete)
  )
  return router
}

module.exports = {
  patients,
  addresses,
  patientMemberRecords
}
