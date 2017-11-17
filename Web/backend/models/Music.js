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
                defaultValue: 0,
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
                defaultValue: "",
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
                type: Sequelize.ENUM('youtube','spotify','deezer','else'),
                defaultValue: "",
                validate: {
                }
            },
            music_groupe: {
              type: Sequelize.TEXT,
              allowNull: false,
              validate: {
              }
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

        // Define relations of this model
    }
};
