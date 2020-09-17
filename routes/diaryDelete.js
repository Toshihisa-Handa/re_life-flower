var express = require('express');
var router = express.Router();
let diary_c = require('../controllers/diary')//コントローラーフォルダのhogeファイルを読み取る

//削除のルーティング
router.get('/:id',diary_c.diaryDelete)

  module.exports = router;
