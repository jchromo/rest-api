'use strict'
module.exports = (sequelize, DataTypes) => {
  const PatientMemberRecord = sequelize.define('PatientMemberRecord', {
    medicalRecordNumber: DataTypes.STRING,
    enterpriseId: DataTypes.STRING,
    socialSecurityNumber: DataTypes.STRING,
    source: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    addressId: DataTypes.INTEGER
  }, {})
  PatientMemberRecord.associate = models => {
    PatientMemberRecord.belongsTo(models.Address, { as: 'address' })
  }
  return PatientMemberRecord
}
