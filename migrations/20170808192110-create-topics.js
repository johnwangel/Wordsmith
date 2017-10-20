'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('topics', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        created_by: {
          type: Sequelize.INTEGER,
          onUpdate: 'cascade',
          references: { model: 'users', key: 'id', as: 'Creator' }
        }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('topics');
  }
};