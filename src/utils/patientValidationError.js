module.exports = class PatientValidationError extends Error {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, PatientValidationError)
  }
}
