var express = require('express');
var router = express.Router();

let main_c = require('../controllers/main')//コントローラーフォルダの指定ファイルを読み取る

router.get('/',main_c.top);

module.exports = router;
