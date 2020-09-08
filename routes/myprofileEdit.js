var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り

router.get('/',(req, res)=>{
  // res.renderで指定ファイルの画面表示させる
  res.render('myprofileEdit.ejs');


  
});

module.exports = router;
