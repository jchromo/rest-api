const { Address } = require('../models')

const create = async (body) => Address.create(body)
const read = async ({ id, query }) => id ? Address.findByPk(id) : Address.findAll({ where: query })
const update = async (body, id) => Address.update(body, { where: { id: parseInt(id) } })
const del = async (body) => Address.delete(body)

module.exports = {
  create,
  read,
  update,
  del
}
