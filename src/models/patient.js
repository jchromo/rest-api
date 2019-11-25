'use strict'
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    enterpriseId: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    socialSecurityNumber: DataTypes.STRING
  }, {})
  Patient.associate = function (models) {
    Patient.hasOne(models.Address, {
      foreignKey: 'patientId',
      as: 'address'
    })
    Patient.hasMany(models.PatientMemberRecord, {
      foreignKey: 'patientId',
      as: 'patientMemberRecords'
    })
  }
  return Patient
}
