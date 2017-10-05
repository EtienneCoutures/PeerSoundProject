/**
 * Created by Alcyona on 10/06/2015.
 */
const dirDepth = '../../..';
const MVCR = dirDepth  + '/MVCR';
const config = require(dirDepth  +  '/appConfig.js');

//// POUR SE CONNECTER A UN SERVEUR SQLITE3
//// cf : http://blog.modulus.io/nodejs-and-sqlite
//// cf : https://www.npmjs.com/package/sqlite3

const fs = require("fs");
const file = config.dataBases.sqlite.db1.dbfile;
const exists = fs.existsSync(file);

console.log(" SQLITE FILE EXISTE : ", exists );

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);


//// Pour MySQL : cf: https://www.npmjs.com/package/mariasql
function ExecuteSQLrequest_PourSQLITE(sqlRequest, next) {
    console.log("EXEC: ", sqlRequest);
    db.all(sqlRequest, function(err, rows) {
        if (err) {
          console.log(" SQL error : ", err);
          //throw err;
          next(err,rows);
        } else {
          //console.log(" SQL Result :", rows);
          next(err,rows);
        }
      });

}

global.DBnbReconnection = 1;
global.DBsqlPBcas2 = 0;
global.DBsqlPBnonresolved = 0;
var databaseconnected = false;

//===========================================================================

function ExecuteSQLrequest(sqlRequest, next) {
    ExecuteSQLrequest_PourSQLITE(sqlRequest, next);     // Pour utiliser MySQL
}

function AddSQLrequest(tableName, data, next) {

    var sqlInsrtRequest = "INSERT INTO " + tableName + " ("
    var sqlInsrtValues = "";
    var sqlverifRequest = "SELECT * from " + tableName + " where ( ";
    for (var elt in data) {
        sqlInsrtRequest += " [" + elt + "],";
        sqlInsrtValues += " '" + data[elt] + "',";
        sqlverifRequest += " [" + elt + "] = '" + data[elt] + "' AND";
        //console.log(""+typeof(data[elt])+" : "+elt+'=> '+data[elt])
        //var b = (typeof(data[elt]) == 'number');
    }

    sqlInsrtRequest = sqlInsrtRequest.substring(0, sqlInsrtRequest.length - 1);
    sqlInsrtValues = sqlInsrtValues.substring(0, sqlInsrtValues.length - 1);
    sqlverifRequest = sqlverifRequest.substring(0, sqlverifRequest.length - 3);

    sqlInsrtRequest += " ) VALUES ( " + sqlInsrtValues + " )";
    sqlverifRequest += " )";

    //console.log("On obtient  'sqlInsrtRequest':", sqlInsrtRequest);
    //console.log("            'sqlverifRequest':", sqlverifRequest);

    ExecuteSQLrequest(sqlInsrtRequest, function (err, recordset) {
        // le nouvel user a été créé en base de données, on va vérifié et obtenir l'enregistrement complet avec son id

        ExecuteSQLrequest(sqlverifRequest, function (err, recordset) {
            if(recordset) {
                if (recordset.length > 0) next(err, recordset); // On renvoie l'id du nouvel utilisateur créé
                else next(err, recordset); // Sinon on renvoi ce quel'on a obtenu en "brut"
            }
            else next(err, recordset); // Sinon on renvoi ce quel'on a obtenu en "brut"
        });
    });
}





/**
 * The CLASS :  sqlServer
 * @constructor
 */
var  sqlServer = {
    Execute: ExecuteSQLrequest,
    Add: AddSQLrequest
}

module.exports = sqlServer ;
