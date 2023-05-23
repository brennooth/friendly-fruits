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
  var sql = 'INSERT INTO products (name, article_no, description, price, image) VALUES ?';
  var values = [
    ['Banana', 12345, 'Weirdly shaped yellow fruit. Often used in famout "banana for scale" joke.', 34.56, ''],
    [
      'Apple',
      17893,
      'Often used to compare children to their parents in that apples rarely fall far from the tree.',
      19.29,
      '',
    ],
    ['Lemon', 73309, 'If life hands you lemons, make lemonade.', 38.12, ''],
    ['Kiwi', 79803, 'Fruit. Not to be confused with the bird from New Zealand.', 8.13, ''],
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log('Number of records inserted: ' + result.affectedRows);
  });
});
