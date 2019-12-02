'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PatientMemberRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      medicalRecordNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      enterpriseId: {
        allowNull: false,
        type: Sequelize.DataTypes.UUID
      },
      socialSecurityNumber: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: 'uniqueTag'
      },
      source: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: 'uniqueTag'
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      addressId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Addresses',
          key: 'id',
          as: 'addressId'
        }
      }
    }).then(function () {
      return queryInterface.sequelize.query(
        'ALTER TABLE `PatientMemberRecords` ADD UNIQUE `unique_index`(`socialSecurityNumber`, `source`)'
      )
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PatientMemberRecords')
  }
}
