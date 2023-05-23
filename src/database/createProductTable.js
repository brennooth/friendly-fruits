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
  var sql =
    'CREATE TABLE products (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), article_no INT, description VARCHAR(255), price FLOAT, image VARCHAR(255))';
  con.query(sql, function (err) {
    if (err) throw err;
    console.log('Table created');
  });
});
