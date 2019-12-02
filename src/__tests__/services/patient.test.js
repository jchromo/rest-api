const { PatientService } = require('../../services')

jest.mock('../../models', () => {
  const uuidv4 = require('uuid/v4')
  return {
    sequelize: {
      transaction: async () => ({ commit: async () => null })
    },
    PatientMemberRecord: {
      findOne: async () => null,
      create: async () => null,
      findAll: async () => {},
      update: async () => [1],
      destroy: async () => null
    },
    Patient: {
      findOne: async () => ({ dataValues: { id: uuidv4() } })
    },
    Address: {
      findOrCreate: async () => [{ id: 1 }]
    }
  }
})

describe('PatientService', function () {
  describe('Create Patient', function () {
    test('Should create patient', () => {
      expect(PatientService.create({})).resolves.toBeDefined()
    })
  })

  describe('Read Patient', function () {
    test('Should read patientes', () => {
      expect(PatientService.read({ id: '', query: '' })).resolves.toBeDefined()
    })
  })

  describe('Update Patient', function () {
    test('Should update patient', () => {
      expect(PatientService.update({}, '')).resolves.toBeDefined()
    })
  })

  describe('Delete Patient', function () {
    test('Should delete patient', () => {
      expect(PatientService.del('')).resolves.toBeDefined()
    })
  })
})
