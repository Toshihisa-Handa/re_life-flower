var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り

router.get('/',(req, res)=>{
connection.query('SELECT * FROM user',(error,results)=>{
  // res.renderで指定ファイルの画面表示させる
  res.render('top.ejs');
})


  
});

module.exports = router;
