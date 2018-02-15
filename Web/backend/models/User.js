/**
 * This is the model class for table "user".
 */
'use strict';
var Sequelize = require('sequelize'),
    sequelize = global.sequelize,
    crypt = require('password-hash');

module.exports = function (app) {
    if (!sequelize.isDefined('User')) {
        var schema = {
            // List of 'User' fields
            usr_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                validate: {
                }
            },
            usr_login: {
                type: Sequelize.STRING,
                allowNull: true,
                validate: {
                }
            },
            usr_password: {
                type: Sequelize.STRING,
                defaultValue: "",
                set: function (password) {
                    if (password) {
                        this.setDataValue('usr_password', crypt.generate(password));
                    }
                },
                validate: {
                }
            },
            usr_email: {
                type: Sequelize.STRING,
                unique: true,
                defaultValue: "",
                validate: {
                    isEmail: true
                }
            },
            usr_gender: {
                type: Sequelize.ENUM('man','woman'),
                defaultValue: "man",
                validate: {
                }
            },
            usr_firstname: {
                type: Sequelize.STRING,
                defaultValue: "",
                validate: {
                }
            },
            usr_lastname: {
                type: Sequelize.STRING,
                defaultValue: "",
                validate: {
                }
            },
            usr_phone: {
                type: Sequelize.STRING,
                defaultValue: "",
                validate: {
                }
            },
            usr_birthday: {
                type: Sequelize.DATE,
                defaultValue: 0,
                validate: {
                }
            },
            /*usr_role: {
                type: Sequelize.ENUM('super-admin','admin','member'),
                defaultValue: "member",
                validate: {
                }
            },*/
            usr_insert: {
                type: Sequelize.DATE,
                defaultValue: 0,
                validate: {
                }
            },
            usr_update: {
                type: Sequelize.DATE,
                defaultValue: 0,
                validate: {
                }
            },
            usr_status: {
                type: Sequelize.ENUM('waiting','active','lock'),
                defaultValue: "active",
                validate: {
                }
            },
            usr_image: {
              type: Sequelize.BLOB,
              defaultValue: null,
              validate:{
              },
            /*nb_followers: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                validate: {
                }
              },
              nb_following: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                validate: {
                }
              }*/
            }
        };

        app.models.User = sequelize.define('User', schema, {
            // Define model options
            timestamps: true,
            createdAt: 'usr_insert',
            updatedAt: 'usr_update',
            freezeTableName: true,
            tableName: 'user',
            instanceMethods: {
                validatePassword: function (password) {
                    return crypt.verify(password, this.usr_password);
                }
            }
        });
        require('./Follow')(app)
        require('./Playlist')(app)
        require('./Subscription')(app)
        app.models.User.hasMany(app.models.Follow, {as: 'Following', foreignKey: 'follower_usr_id', sourceKey: 'usr_id'})
        app.models.User.hasMany(app.models.Follow, {as: 'Followers', foreignKey: 'followed_usr_id', sourceKey: 'usr_id'})
        app.models.User.hasMany(app.models.Playlist, {as: 'Playlist', foreignKey: 'playlist_creator', sourceKey: 'usr_id'})
        app.models.User.hasMany(app.models.Subscription, {as: 'Subscription', foreignKey: 'usr_id', sourceKey: 'usr_id'})

    /*   sequelize.sync({ alter: true }).then(function(res) {
        console.log(app.models.User.Instance.prototype)
      }).catch(function (err) {
          logger.error(err);
      });*/
        // List of required models
        // Define relations of this model
    }
};
