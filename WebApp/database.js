var mysql = require('mysql');

var db = "peersoundproject";
var whoAmI = "itiz";
var pass = "judelapoire";

var con = mysql.createConnection({
  host: "localhost",
  user: whoAmI,
  password: pass,
  database: db
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var table = "users";
  var sql = "CREATE TABLE " + table + " (id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, nickname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(40) NOT NULL,created_at timestamp default current_timestamp, updated_at timestamp, CONSTRAINT UC_Person UNIQUE (id, email))";
  con.query(sql, function (err, result) {
    if (err) {
      throw err;
    } else {
      console.log("Table created");}
    });
    var table = "musics";
    var sql = "CREATE TABLE " + table + " (id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, link VARCHAR(2084) NOT NULL, name VARCHAR(255) NOT NULL, artist VARCHAR(255) NOT NULL,created_at timestamp default current_timestamp, updated_at timestamp, CONSTRAINT UC_Person UNIQUE (id))";
    con.query(sql, function (err, result) {
      if (err) {
        throw err;
      }
      else {
        console.log("Table created"); }
      });
    });
