'use strict'
module.exports = (sequelize, DataTypes) => {
  const PatientMemberRecord = sequelize.define('PatientMemberRecord', {
    medicalRecordNumber: DataTypes.STRING,
    source: DataTypes.STRING
  }, {})
  PatientMemberRecord.associate = function (models) {

  }
  return PatientMemberRecord
}
