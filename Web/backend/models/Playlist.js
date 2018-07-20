/**
 * This is the model class for the table "playlist".
 */
 'use strict';
 var Sequelize = require('sequelize'),
     sequelize = global.sequelize,
     crypt = require('password-hash');

 module.exports = function (app) {
     if (!sequelize.isDefined('Playlist')) {
         var schema = {
             // List of 'Playlist' fields
             playlist_id: {
                 type: Sequelize.INTEGER,
                 primaryKey: true,
                 autoIncrement: true,
                 validate: {
                 }
             },
             playlist_name: {
                 type: Sequelize.STRING(255),
                 defaultValue: "",
                 validate: {
                 }
             },
             playlist_style: {
                 type: Sequelize.STRING(255),
                 defaultValue: "",
                 validate: {
                 }
             },
             playlist_description: {
                 type: Sequelize.TEXT,
                 validate: {
                 }
             },
             playlist_comment: {
                 type: Sequelize.TEXT,
                 allowNull: true,
                 validate: {
                 }
             },
             playlist_insert: {
                 type: Sequelize.DATE,
                 defaultValue: Sequelize.NOW,
                 validate: {
                 }
             },
             playlist_update: {
                 type: Sequelize.DATE,
                 defaultValue: Sequelize.NOW,
                 validate: {
                 }
             },
             playlist_creator: {
                 type: Sequelize.INTEGER,
                 references: {
                   model: 'user',
                   key: 'usr_id'
                 }
             }
         };

         app.models.Playlist = sequelize.define('Playlist', schema, {
             // Define model options
             timestamps: true,
             createdAt: 'playlist_insert',
             updatedAt: 'playlist_update',
             freezeTableName: true,
             tableName: 'playlist',
             instanceMethods: {
             }
         });

         require('./Subscription')(app)
         require('./User')(app)
         require('./MusicLink')(app)
         app.models.Playlist.hasMany(app.models.Subscription, {as: 'Subscriber', foreignKey: 'playlist_id', sourceKey: 'playlist_id'})
         app.models.Playlist.belongsTo(app.models.User, {
             as: 'Creator',
             foreignKey: 'playlist_creator',
             otherKey: "usr_id",
             onUpdate: 'CASCADE',
             onDelete: 'CASCADE'
         })
         app.models.Playlist.hasMany(app.models.MusicLink, {as: 'MusicLink', foreignKey: 'playlist_id', sourceKey: 'playlist_id'})

         // Define relations of this model
         sequelize.sync().then(function(res) {
          // console.log("Playlist ok"/*app.models.User.Instance.prototype*/)
         }).catch(function (err) {
           logger.error("Playlist: " + err);
         });
     }
 };
