const express = require('express');
const connection = require('./mysqlConnection');//外部ファイルにてdb接続を定義している。それを読み取り。
const app = express()
const port = 3002


connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
  });

app.get('/', (req, res) => res.send('Hello World2!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))