var mysql = require('mysql2');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '********',
  database: 'mydb',
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');
  var sql = 'CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255))';
  con.query(sql, function (err) {
    if (err) throw err;
    console.log('Table created');
  });
});
