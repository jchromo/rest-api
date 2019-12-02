const httpStatus = require('http-status')
const { PatientService } = require('../services')

async function get (req, res) {
  const { source, medicalRecordNumber } = req.params
  const data = await PatientService.read({ source, medicalRecordNumber })
  data ? res.status(httpStatus.OK).send(data) : res.status(httpStatus.NOT_FOUND).send()
}

async function post (req, res) {
  const data = await PatientService.create(req.body)
  res.status(httpStatus.CREATED).send(data)
}
async function patch (req, res) {
  const { source, medicalRecordNumber } = req.params
  const [data] = await PatientService.update(req.body, { source, medicalRecordNumber })
  data === 1 ? res.status(httpStatus.NO_CONTENT).send() : res.status(httpStatus.NOT_FOUND).send('Not Found')
}
async function del (req, res) {
  const { source, medicalRecordNumber } = req.params
  const data = await PatientService.del({ source, medicalRecordNumber })
  data === 1 ? res.status(httpStatus.NO_CONTENT).send() : res.status(httpStatus.NOT_FOUND).send('Not Found')
}

module.exports = { get, post, patch, delete: del }
