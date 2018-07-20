/**
 * This is the model for the table "invitation".
 */
 'use strict';
 var Sequelize = require('sequelize'),
     sequelize = global.sequelize;

 module.exports = function(app) {
    if (!sequelize.isDefined('Invitation')) {
        var schema = {
            // List of 'Invitation' fields
            invitation_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                validate: {
                }
            },
            invitation_insert: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
                validate: {
                }
            },
            invitation_update: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
                validate: {
                }
            },
            inviter_usr_id: {
                type: Sequelize.INTEGER,
                references: {
                  model: 'user',
                  key: 'usr_id'
                }
            },
            invited_usr_id: {
                type: Sequelize.INTEGER,
                references: {
                  model: 'user',
                  key: 'usr_id'
                }
            },
            playlist_id: {
                type: Sequelize.INTEGER,
                references: {
                  model: 'playlist',
                  key: 'playlist_id'
                }
            },
            invited_role: {
                type: Sequelize.ENUM('super-admin','admin','member'),
                defaultValue: "member",
                validate: {
                }
            }
        };

        app.models.Invitation = sequelize.define('Invitation', schema, {
            // Define models options
            timestamps: true,
            createdAt: 'invitation_insert',
            updatedAt: 'invitation_update',
            freezeTableName: true,
            tableName: 'invitation',
            instanceMethods: {
            }
        });

        require('./User')(app)
        require('./Playlist')(app)

        app.models.Invitation.belongsTo(app.models.User, {
            as: 'Inviter',
            foreignKey: 'inviter_usr_id',
            otherKey: "usr_id",
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        })
        app.models.Invitation.belongsTo(app.models.User, {
            as: 'Invited',
            foreignKey: 'invited_usr_id',
            otherKey: "usr_id",
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        })
        app.models.Invitation.belongsTo(app.models.Playlist, {
            as: 'Playlist',
            foreignKey: 'playlist_id',
            otherKey: "playlist_id",
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        })
    }
    sequelize.sync().then(function(res) {
      //console.log("Invitation ok"/*app.models.User.Instance.prototype*/)

    }).catch(function (err) {
      logger.error("Invitation: " + err);
    });

 };
