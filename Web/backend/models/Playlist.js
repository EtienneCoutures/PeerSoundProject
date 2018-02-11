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
                 defaultValue: 0,
                 validate: {
                 }
             },
             playlist_update: {
                 type: Sequelize.DATE,
                 defaultValue: 0,
                 validate: {
                 }
             },
             playlist_creator: {
               type: Sequelize.INTEGER,
               references: 'user', // <<< Note, its table's name, not object name
               referencesKey: 'usr_id' // <<< Note, its a column name
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

         // List of required models

         // Define relations of this model
     }
 };
