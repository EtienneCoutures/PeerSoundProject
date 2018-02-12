'use strict';
var Sequelize = require('sequelize'),
sequelize = global.sequelize;

module.exports = function (app) {
  if (!sequelize.isDefined('Follow')) {
    var schema = {
      follow_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          validate: {
          }
      },
      follow_insert: {
          type: Sequelize.DATE,
          defaultValue: 0,
          validate: {
          }
      },
      followed_usr_id: {
          type: Sequelize.INTEGER,
          references : {
            model: 'User',
            key: 'usr_id'
          }
          //defaultValue: 0,
          //validate: {
          //}
      },
      follower_usr_id: {
          type: Sequelize.INTEGER,
          references : {
            model: 'User',
            key: 'usr_id'
          }
          /*defaultValue: 0,
          validate: {
          }*/
      }
    };
    app.models.Follow = sequelize.define('Follow', schema, {
        // Define model options
        timestamps: true,
        createdAt: 'follow_insert',
        updatedAt: 'follow_insert',
        freezeTableName: true,
        tableName: 'follow'
    });
  }
  /*app.models.Follow.hasOne(app.models.User, {
    foreignKey: {
      name: 'usr_id',
      allowNull: false
    }
  })
  app.models.Follow.hasOne(app.models.User, {
    foreignKey: {
      name: 'usr_id',
      allowNull: false
    }
  })*/
  sequelize.sync();
};