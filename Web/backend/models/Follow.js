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
          defaultValue: null,
          validate: {
          }
      },
      followed_usr_id: {
          type: Sequelize.INTEGER,
          references : {
            model: 'user',
            key: 'usr_id'
          }
          //defaultValue: 0,
          //validate: {
          //}
      },
      follower_usr_id: {
          type: Sequelize.INTEGER,
          references : {
            model: 'user',
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
  require('./User')(app)
  app.models.Follow.belongsTo(app.models.User, {
    as: 'Follower',
    foreignKey: 'follower_usr_id',
    otherKey: "usr_id",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })

  app.models.Follow.belongsTo(app.models.User, {
    as: 'Followed',
    foreignKey: 'followed_usr_id',
    otherKey: "usr_id",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })

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
};
