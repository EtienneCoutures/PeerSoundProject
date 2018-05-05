'use strict';
var Sequelize = require('sequelize'),
sequelize = global.sequelize;

module.exports = function (app) {
  if (!sequelize.isDefined('Subscription')) {
    var schema = {
      sub_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          validate: {
          }
      },
      sub_insert: {
          type: Sequelize.DATE,
          defaultValue: 0,
          validate: {
          }
      },
      usr_id: {
          type: Sequelize.INTEGER,
          references : {
            model: 'user',
            key: 'usr_id'
          }
      },
      playlist_id: {
          type: Sequelize.INTEGER,
          references : {
            model: 'playlist',
            key: 'playlist_id'
          }
        },
        usr_role: {
          type: Sequelize.ENUM('super-admin','admin','member'),
          defaultValue: "member",
          validate: {
          }
        }
    };
    app.models.Subscription = sequelize.define('Subscription', schema, {
        // Define model options
        timestamps: true,
        createdAt: 'sub_insert',
        updatedAt: 'sub_insert',
        freezeTableName: true,
        tableName: 'Subscription'
    });

    require('./User')(app)
    app.models.Subscription.belongsTo(app.models.User, {
      as: 'Subscriber',
      foreignKey: 'usr_id',
      otherKey: "usr_id",
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })

    require('./Playlist')(app)
    app.models.Subscription.belongsTo(app.models.Playlist, {
      as: 'Playlist',
      foreignKey: 'playlist_id',
      otherKey: "playlist_id",
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })

  }
  //sequelize.sync().then(function() { console.log(app.models.Subscription.Instance.prototype) })
};
