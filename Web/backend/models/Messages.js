'use strict';
var Sequelize = require('sequelize'),
sequelize = global.sequelize;

module.exports = function (app) {
  if (!sequelize.isDefined('Message')) {
    var schema = {
      message_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          validate: {
          }
      },
      message_insert: {
          type: Sequelize.DATE,
          defaultValue: 0,
          validate: {
          }
      },
      message_update: {
          type: Sequelize.DATE,
          defaultValue: 0,
          validate: {
          }
      },
      sender_id: {
          type: Sequelize.INTEGER,
          references : {
            model: 'user',
            key: 'usr_id'
          }
      },
      dest_id: {
          type: Sequelize.INTEGER,
          references : {
            model: 'user',
            key: 'usr_id'
          }
      },
      content: {
          type: Sequelize.TEXT,
          allowNull: false,
      },
      is_read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    };

    app.models.Message = sequelize.define('Message', schema, {
        // Define model options
        timestamps: true,
        createdAt: 'message_insert',
        updatedAt: 'message_insert',
        freezeTableName: true,
        tableName: 'message'
    });
  }
  require('./User')(app)
  app.models.Message.belongsTo(app.models.User, {
    as: 'Sender',
    foreignKey: 'sender_id',
    otherKey: "usr_id",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })

  app.models.Message.belongsTo(app.models.User, {
    as: 'Dest',
    foreignKey: 'dest_id',
    otherKey: "usr_id",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })

  sequelize.sync({ alter: true }).then(function(res) {
   console.log("c'est synch genre message")
 }).catch(function (err) {
     logger.error(err);
 });
};
