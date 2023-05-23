var mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const app = express();

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '********',
  database: 'mydb',
});

app.use(cors());

app.use('/login', (req, res) => {
  res.send({
    token: 'test123',
  });
});

app.use('/products', (req, res) => {
  con.connect(function (err) {
    if (err) throw err;
    con.query('SELECT * FROM products', function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.use('/users', (req, res) => {
  con.connect(function (err) {
    if (err) throw err;
    con.query('SELECT * FROM users', function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000/login');
});
