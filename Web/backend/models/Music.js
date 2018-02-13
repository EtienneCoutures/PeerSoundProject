/**
 * This is the model class for table "music".
 */
'use strict';
var Sequelize = require('sequelize'),
    sequelize = global.sequelize,
    crypt = require('password-hash');

module.exports = function (app) {
    if (!sequelize.isDefined('Music')) {
        var schema = {
            // List of 'Music' fields
            music_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                validate: {
                }
            },
            music_name: {
                type: Sequelize.STRING(255),
                defaultValue: "",
                validate: {
                }
            },
            music_description: {
                type: Sequelize.TEXT,
                validate: {
                }
            },
            music_comment: {
                type: Sequelize.TEXT,
                allowNull: true,
                validate: {
                }
            },
            music_picture_default: {
                type: Sequelize.STRING(255),
                defaultValue: "",
                validate: {
                }
            },
            music_insert: {
                type: Sequelize.DATE,
                defaultValue: 0,
                validate: {
                }
            },
            music_update: {
                type: Sequelize.DATE,
                defaultValue: 0,
                validate: {
                }
            },
            music_source: {
                type: Sequelize.ENUM('youtube','spotify','deezer', 'soundcloud', 'else'),
                defaultValue: "youtube",
                validate: {
                }
            },
            music_group: {
              type: Sequelize.TEXT,
              validate: {
              }
            },
            music_url: {
              type: Sequelize.TEXT,
              validate: {
              }
            },
            music_date: {
              type: Sequelize.TEXT,
              validate: {
              }
            },
            usr_id: {
              type: Sequelize.INTEGER,
              references: 'user', // <<< Note, its table's name, not object name
              referencesKey: 'usr_id' // <<< Note, its a column name
            }
        };

        app.models.Music = sequelize.define('Music', schema, {
            // Define model options
            timestamps: true,
            createdAt: 'music_insert',
            updatedAt: 'music_update',
            freezeTableName: true,
            tableName: 'music',
            instanceMethods: {
            }
        });

        // List of required models
        sequelize.sync()
        // Define relations of this model
    }
};
