'use strict';
/**
 * This is the model class for table "AccessToken".
 */
'use strict';
var Sequelize = require('sequelize'),
    sequelize = global.sequelize,
    logger = global.logger;

module.exports = function (app) {
    if (!sequelize.isDefined('AccessToken')) {
        var schema = {
            'atok_id': {
                type: Sequelize.INTEGER(11),
                primaryKey: true,
                autoIncrement: true
            },
            'atok_token': {
                type: Sequelize.STRING(255)
            },
            'usr_id': {
                type: Sequelize.INTEGER,
                references : {
                  model: 'User',
                  key: 'usr_id'
                }
            },
            'atok_type': {
                type: Sequelize.ENUM('access', 'recovery'),
                defaultValue: "access"
            },
            'atok_insert': {
                type: Sequelize.DATE
            },
            'atok_update': {
                type: Sequelize.DATE
            }
        };

        app.models.AccessToken = sequelize.define('AccessToken', schema, {
            // Define model options
            timestamps:true,
            createdAt:'atok_insert',
            updatedAt:'atok_update',
            freezeTableName:true,
            tableName:'access_token'
        });

        // List of required models
        require('./User')(app);

        // Define relations of this model
        app.models.AccessToken.belongsTo(app.models['User'], {
            foreignKey:'usr_id',
            as:'User',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

      /*  app.models.AccessToken.sync().then(function () {
        }).catch(function (err) {
            logger.error(err);
        });*/
    }
  };
