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
  var sql = 'INSERT INTO users (username, password) VALUES ?';
  var values = [
    ['admin', 'admin'],
    ['peter', 'test'],
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log('Number of records inserted: ' + result.affectedRows);
  });
});
