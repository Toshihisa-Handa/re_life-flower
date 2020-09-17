var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り
let shop_c = require('../controllers/shop')//コントローラーフォルダの指定ファイルを読み取る



  router.post('/:id', shop_c.myprofileUpdate);
 
  module.exports = router;
