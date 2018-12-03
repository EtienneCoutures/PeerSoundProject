/**
 * This is the model class for table "musiclink".
 */
 'use strict';
 var Sequelize = require('sequelize'),
     sequelize = global.sequelize;

     module.exports = function (app) {
         if (!sequelize.isDefined('MusicLink')) {
             var schema = {
                 // List of 'MusicLink' fields
                 musiclink_id: {
                     type: Sequelize.INTEGER,
                     primaryKey: true,
                     autoIncrement: true,
                     validate: {
                     }
                 },
                 music_id: {
                     type: Sequelize.INTEGER,
                     references: {
                       model: 'music',
                       key: 'music_id'
                     }
                 },
                 playlist_id: {
                   type: Sequelize.INTEGER,
                   references: {
                     model: 'playlist',
                     key: 'playlist_id'
                   }
                 },
                 usr_id: {
                   type: Sequelize.INTEGER,
                   references : {
                     model: 'user',
                     key: 'usr_id'
                   }
                 },
                 musiclink_insert: {
                     type: Sequelize.DATE,
                     defaultValue: 0,
                     validate: {
                     }
                 },
                 musiclink_update: {
                     type: Sequelize.DATE,
                     defaultValue: 0,
                     validate: {
                     }
                 },
             };

             app.models.MusicLink = sequelize.define('MusicLink', schema, {
                 // Define model options
                 timestamps: true,
                 createdAt: 'musiclink_insert',
                 updatedAt: 'musiclink_update',
                 freezeTableName: true,
                 tableName: 'musiclink',
                 instanceMethods: {
                 }
             });


             require('./Playlist')(app)
             require('./Music')(app)
             app.models.MusicLink.belongsTo(app.models.Playlist, {
               as: 'Playlist',
               foreignKey: 'playlist_id',
               otherKey: "playlist_id",
               onUpdate: 'CASCADE',
               onDelete: 'CASCADE',
             })

             app.models.MusicLink.belongsTo(app.models.Music, {
               as: 'Music',
               foreignKey: 'music_id',
               otherKey: "music_id",
               onUpdate: 'CASCADE',
               onDelete: 'CASCADE',
             })

            /* sequelize.sync({ alter: true }).then(function(res) {
             }).catch(function (err) {
                logger.error(err);
             });*/
        }
    };
