const { PatientMemberRecord } = require('../models')

const create = async (body) => PatientMemberRecord.create(body)
const read = async ({ id, query }) => id ? PatientMemberRecord.findByPk(id) : PatientMemberRecord.findAll({ where: query })
const update = async (body, id) => PatientMemberRecord.update(body, { where: { id: parseInt(id) } })
const del = async (body) => PatientMemberRecord.delete(body)

module.exports = {
  create,
  read,
  update,
  del
}
