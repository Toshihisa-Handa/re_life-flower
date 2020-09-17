var express = require('express');
var router = express.Router();
let shop_c = require('../controllers/shop')//コントローラーフォルダの指定ファイルを読み取る

router.get('/', shop_c.mypage);

module.exports = router;
