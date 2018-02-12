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
          defaultValue: 0,
          validate: {
          }
      },
      playlist_id: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
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
  }
  sequelize.sync();
};
