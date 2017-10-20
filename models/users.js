'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('users', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  Users.associate = function(models) {
    Users.hasMany(models.topics, { foreignKey: 'created_by' });
    Users.hasMany(models.messages, { foreignKey: 'author_id' });
  };
  return Users;
};
