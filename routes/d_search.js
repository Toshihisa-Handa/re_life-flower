var express = require('express');
var router = express.Router();
let diary_c = require('../controllers/diary')//コントローラーフォルダのhogeファイルを読み取る


router.get('/', diary_c.d_search)	;

module.exports = router;

