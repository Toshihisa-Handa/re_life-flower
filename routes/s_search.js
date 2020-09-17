var express = require('express');
var router = express.Router();
let shop_c = require('../controllers/shop')//コントローラーフォルダの指定ファイルを読み取る

router.get('/',shop_c.s_search)

module.exports = router;
