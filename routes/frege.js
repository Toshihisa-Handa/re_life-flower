var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り

let flower_c = require('../controllers/flower')//コントローラーフォルダの指定ファイルを読み取る


router.get('/', flower_c.frege)	;

module.exports = router;
