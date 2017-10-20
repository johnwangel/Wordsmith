'use strict';
module.exports = function(sequelize, DataTypes) {
  var Topics = sequelize.define('topics', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  Topics.associate = function(models) {
    Topics.belongsTo(models.users, { foreignKey: 'created_by' } );
    Topics.hasMany(models.messages, { foreignKey: 'topic_id' });
  };

  return Topics;
};