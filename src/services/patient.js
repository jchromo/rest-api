const { Patient } = require('../models')

const create = async (body) => Patient.create(body)
const read = async ({ id, query }) => id ? Patient.findByPk(id) : Patient.findAll({ where: query })
const update = async (body, id) => Patient.update(body, { where: { id: parseInt(id) } })
const del = async (id) => Patient.destroy({ where: { id: parseInt(id) } })

module.exports = {
  create,
  read,
  update,
  del
}
