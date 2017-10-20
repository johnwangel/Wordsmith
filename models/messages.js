'use strict';
module.exports = function(sequelize, DataTypes) {
  var Messages = sequelize.define('messages', {
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Messages.associate = function(models) {
    Messages.belongsTo(models.topics, { foreignKey: 'topic_id' });
    Messages.belongsTo(models.users, { foreignKey: 'author_id' });
  };
  return Messages;
};