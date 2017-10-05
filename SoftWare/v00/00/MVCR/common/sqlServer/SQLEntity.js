const dirDepth = '../../..';
const MVCR = dirDepth  + '/MVCR';
const config = require(dirDepth  +  '/appConfig.js');

var sqlServer = require(MVCR + "/common/sqlServer/sqlServer.js");

class Security {
    constructor () {

    }

    isInt(data) {
      return (true);
    }

    htmlInt2DB(data) {
      return (data);
    }

    htmlText2DB(data) {
      return (data);
    }
}

var security = new Security();

class SQLEntity {

  constructor(tableName) {
    this.tableName = tableName;
    this.result = "";
  }

    securityCheck(data, type)
    {

      /*
      console.log("data: ", data);
      console.log("type: ", type);
      */

        if (type == "object")
        {
                  return (this.dbSecurityFormat(data));
        }
        else if (type == "boolean")
        {
                  return (security.isInt(data) ? security.htmlInt2DB("" + data) : null);
        }
        else if (type == "number")
        {
                  return (security.isInt(data) ? security.htmlInt2DB("" + data) : null);
        }
        else if (type == "string")
        {
                  return (security.htmlText2DB(data));
        }
        else if (type == "undefined")
          return ("");
        return (null);
    }

securityTest()
{
    var obj1 = {mybool : true, myInt : 42, myStr : "hello", data : {myIntbis : 21, str : "world"}};

    if (this.dbSecurityFormat(obj1) === null)
	   console.log("dbSecurity failed on variable: ", obj1);
    else
	   console.log("Variable correctly formated for DB!");
}

dbSecurityFormat(dbObj) {
      var fdbObj = dbObj;
      var n="";

      for (var elm in fdbObj) {
          if ((n = this.securityCheck(dbObj[elm], typeof(dbObj[elm]))) === null)
          {
            console.log("Error while constructing SQL request: invalid format.");
            return (null);
          }
      }
      return dbObj;
    }

    List(callback, tableName = this.tableName) {

      var self = this;
      var req = "SELECT rowID, * FROM " + tableName + ";";

      sqlServer.Execute(req, (err, rows) => {
        console.log(err ? err : rows);
        self.result = err ? "ERROR" : rows;
        callback(err, rows);
      });
      return (self.result);
    }

    countEntry(callback, tableName = this.tableName) {
      var self = this;
      var req = "SELECT COUNT(*) FROM " + tableName + ";";

      sqlServer.Execute(req, (err, rows) => {
        console.log(err ? err : rows);
        self.result = err ? "ERROR" : rows;
        callback(err, rslt)
      });
      return (self.result);
    }

    Create(data, callback, tableName = this.tableName) {

      console.log("create: ", data);

      if (!this.dbSecurityFormat(data))
        return ("Error while parsing input Object for DB: invalid format.");

        console.log("SQL CREATE: tableName: ", tableName, " data: ", typeof(data));

            var self = this;
            var req = "INSERT INTO " + tableName + "(";

            for (var elm in data) {
              req += elm + ",";
            }

            /*
            data.forEach(function(value, key, map) {
              req += key + ",";
            })
            */

            req = req.substring(0, req.length - 1);

            console.log("mid req: ", req);

            req += ") VALUES(";

            for (var elm in data) {
              req += "'" + data[elm] + "',";
            }

            /*
            data.forEach(function(value, key, map) {
              req += "'" + value + "',";
            })
            */

            req = req.substring(0, req.length - 1);

            req += ");";
            console.log("req: ", req);
            sqlServer.Execute(req, (err, rows) => {
              console.log(err ? err : rows);
              callback(err ? err : null, rows ? rows : null);
              self.result = err ? "ERROR" : rows;
            });
            return (self.result);
    }

    Read(data, callback, tableName = this.tableName) {

      if (!this.dbSecurityFormat(data))
        return ("Error while parsing input Object for DB: invalid format.");

      //console.log("SQL READ: tableName: ", tableName, " data: ", data);
      var self = this;
      var req = "SELECT ";

      for (var elm in data)
        req += elm + ",";

      req = req.substring(0, req.length - 1);

      req += " FROM " + tableName + " WHERE ";

      for (var elm in data)
      {
        if (data[elm] !== "")
          req += elm + "='" + data[elm] + "' AND ";
      }

      req = req.substring(0, req.length - 5);

      req += ";";
      console.log("req: ", req);
      sqlServer.Execute(req, (err, rows) => {
        self.result = err ? "ERROR" : rows;
        callback(err, rows);
      });

      return (self.result);
    }

    Update(old, nData, callback, tableName = this.tableName) {

      if (!this.dbSecurityFormat(old) || !this.dbSecurityFormat(nData))
        return ("Error while parsing input Object for DB: invalid format.");

      console.log("SQL UPDATE: tableName: ", tableName, " data: ", nData);

      var self = this;
      var req = "UPDATE " + tableName + " SET ";

      for (var elm in nData)
      {
          console.log("variable: ", nData[elm]);
	         req += elm + "='" + nData[elm] + "'";
          console.log("e :", nData[elm]);
	         req += ",";
      }

       req = req.substring(0, req.length - 1);
	     req += " WHERE ";

      console.log("mid req: ", req);

      for (var elm in old)
      {
        if (old[elm] !== "")
          req += elm + "='" + old[elm] + "' AND ";
      }

      req = req.substring(0, req.length - 5);

      req += ";";
      console.log("req: ", req);
      sqlServer.Execute(req, (err, rows) => {
        console.log(err ? err : rows);
        self.result = err ? "ERROR" : rows;
        callback(err, rows);
      });
      return (self.result);
    }

    Delete(data, callback, tableName = this.tableName) {

      if (!this.dbSecurityFormat(data))
        return ("Error while parsing input Object for DB: invalid format.");

      var self = this;
      console.log("SQL DELETE: tableName: ", tableName, " data: ", data);
      var req = "DELETE FROM " + tableName;

      req += " WHERE ";

      for (var elm in data)
      {
        if (data[elm] !== "")
          req += elm + "='" + data[elm] + "' AND ";
      }

      req = req.substring(0, req.length - 5);

      req += ";";
      console.log("req: ", req);
      sqlServer.Execute(req, (err, rows) => {
        console.log(err ? err : rows);
        self.result = err ? "ERROR" : rows;
        callback(err, rows)
      });
      return (self.result);
    }

    executeSQL(request, callback) {
      sqlServer.Execute (request, callback);
    }
}

module.exports = SQLEntity;
