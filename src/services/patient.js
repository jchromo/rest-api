const db = require('../models')
const { log } = require('../utils/logger')
const PatientValidationError = require('../utils/patientValidationError')
const { PatientMemberRecord, Patient, Address } = db
const uuidv4 = require('uuid/v4')

const create = async (body) => {
  let transaction
  try {
    // get transaction
    transaction = await db.sequelize.transaction({ autocommit: false })
    const { firstName, lastName, medicalRecordNumber, source, socialSecurityNumber, address: addressRequest } = body

    // check if a medical record number already exists on the organizational level
    const existingPatientMemberRecord = await PatientMemberRecord.findOne({ where: { socialSecurityNumber, source } })
    if (existingPatientMemberRecord) {
      throw new PatientValidationError(`Patient with ssn ${socialSecurityNumber} has already been assigned a medical record number: ${medicalRecordNumber} in source: ${source}`)
    }
    // match patient in enterpise index using ssn.  If no match, create one
    let enterpriseId
    const existingEnterprisePatient = await Patient.findOne({ where: { socialSecurityNumber }, transaction })
    if (existingEnterprisePatient) {
      enterpriseId = existingEnterprisePatient.dataValues.id
    } else {
      const createdEnterprisePatient = await Patient.create({ id: uuidv4(), socialSecurityNumber }, transaction)
      enterpriseId = createdEnterprisePatient.dataValues.id
    }

    // persist address
    const addressResult = await Address.findOrCreate({ where: addressRequest, transaction })
    const [{ id: addressId }] = addressResult

    // persist patientMemeber records
    await PatientMemberRecord.create({ firstName, enterpriseId, socialSecurityNumber, lastName, medicalRecordNumber, source, addressId }, { transaction })

    // return all patientMemberRecords matched with enterpriseId
    const patientMemberRecordResults = await PatientMemberRecord.findAll({ where: { enterpriseId }, include: [{ model: Address, as: 'address' }], transaction })
    const response = { enterpriseId, patientMemberRecords: patientMemberRecordResults }

    await transaction.commit()
    return response
  } catch (err) {
    if (transaction) await transaction.rollback(err)
    log.error('An error occured creating patient member index', err.message)
    throw (err)
  }
}

const read = async (query) => {
  const patientMemberRecord = await PatientMemberRecord.findOne({ where: query, include: [{ model: Address, as: 'address' }] })
  if (!patientMemberRecord) return patientMemberRecord
  else return { enterpriseId: patientMemberRecord.dataValues.enterpriseId, patientMemberRecord: patientMemberRecord.dataValues }
}
const update = async ({ firstName, lastName }, { source, medicalRecordNumber }) => PatientMemberRecord.update({ firstName, lastName }, { where: { source, medicalRecordNumber } })

const del = async (query) => PatientMemberRecord.destroy({ where: query })

module.exports = {
  create,
  read,
  update,
  del
}
