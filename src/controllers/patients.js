const httpStatus = require('http-status')
const { PatientService } = require('../services')

async function get (req, res) {
  const data = await PatientService.find(req.body, req.user)
  res.status(httpStatus.CREATED).send(data)
}

async function post (req, res) {
  const data = await PatientService.create(req.body, req.user)
  res.status(httpStatus.CREATED).send(data)
}

async function retrieve (req, res) {
}

async function del (req, res) {
}

async function patch (req, res) {
}
module.exports = { get, post, retrieve, patch, delete: del }
