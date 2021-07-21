var mysql1 = require('mysql2');

var con = mysql1.createConnection({
  host: "localhost",
  user: "root",
  password: "Security@15"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE injection;", function (err, result) {
    // if (err) throw err;
    console.log("Database created");
  });
});

const mysql = require('mysql2')
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'injection',
    password: 'Security@15',
    multipleStatements: true,
})

const str = 'CREATE TABLE IF NOT EXISTS users ( id INT AUTO_INCREMENT PRIMARY KEY , UserName VARCHAR(255), Password VARCHAR(255)); INSERT INTO users (id,UserName,Password) VALUES ROW(1,"Yacha Venkata Rakesh","123"), ROW(2,"Venkata Rakesh","sdfdk"), ROW(3,"Rakesh","jsdfld"), ROW(4,"Hitesh","kdfasdf"), ROW(5,"Goutham","sdf234f"), ROW(6,"Dheeraj","sdfljasdf") ON DUPLICATE KEY UPDATE id=id;'
pool.query(str)

module.exports = pool.promise()