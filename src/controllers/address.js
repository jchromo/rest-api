const httpStatus = require('http-status')
const { AddressService } = require('../services')

async function get (req, res) {
  const { id } = req.params
  const query = req.query
  console.log(query)
  const data = await AddressService.read({ id, query })
  data ? res.status(httpStatus.OK).send(data) : res.status(httpStatus.NOT_FOUND).send()
}

async function post (req, res) {
  const data = await AddressService.create(req.body)
  res.status(httpStatus.CREATED).send(data)
}
async function patch (req, res) {
  const { id } = req.params
  const [data] = await AddressService.update(req.body, id)
  data === 1 ? res.status(httpStatus.NO_CONTENT).send() : res.status(httpStatus.NOT_FOUND).send('Not Found')
}
async function del (req, res) {
  const data = await AddressService.del(req.body)
  res.status(httpStatus.CREATED).send(data)
}

module.exports = { get, post, patch, delete: del }
