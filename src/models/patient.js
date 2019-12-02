'use strict'
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    socialSecurityNumber: DataTypes.STRING
  }, {})
  return Patient
}
