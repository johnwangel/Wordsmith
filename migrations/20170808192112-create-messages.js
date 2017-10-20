'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('messages', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        body: {
          type: Sequelize.TEXT,
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
        author_id: {
          type: Sequelize.INTEGER,
          onUpdate: 'cascade',
          references: { model: 'users', key: 'id', as: 'Topic' }
        },
        topic_id: {
          type: Sequelize.INTEGER,
          onUpdate: 'cascade',
          references: { model: 'topics', key: 'id', as: 'Author'}
        }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('messages');
  }
};