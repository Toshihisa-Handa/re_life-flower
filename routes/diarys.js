var express = require('express');
var router = express.Router();

let diary_c = require('../controllers/diary')//コントローラーフォルダの指定ファイルを読み取る

router.get('/', diary_c.diarys)	;

module.exports = router;
