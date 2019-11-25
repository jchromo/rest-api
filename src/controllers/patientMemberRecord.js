const httpStatus = require('http-status')
const { PatientMemberRecordService } = require('../services')

async function get (req, res) {
  const { id } = req.params
  const query = req.query
  const data = await PatientMemberRecordService.read({ id, query })
  data ? res.status(httpStatus.OK).send(data) : res.status(httpStatus.NOT_FOUND).send()
}

async function post (req, res) {
  console.log('CREATNING!!!!!!!!!!!! MEMBER RECORD')
  const data = await PatientMemberRecordService.create(req.body)
  res.status(httpStatus.CREATED).send(data)
}
async function patch (req, res) {
  const { id } = req.params
  const [data] = await PatientMemberRecordService.update(req.body, id)
  data === 1 ? res.status(httpStatus.NO_CONTENT).send() : res.status(httpStatus.NOT_FOUND).send('Not Found')
}
async function del (req, res) {
  const data = await PatientMemberRecordService.del(req.body)
  res.status(httpStatus.CREATED).send(data)
}

module.exports = { get, post, patch, delete: del }
