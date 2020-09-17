var express = require('express');
var router = express.Router();

let diary_c = require('../controllers/diary')//コントローラーフォルダのhogeファイルを読み取る

//日記編集画面へのルーティング
router.get('/:id',diary_c.diaryEdit)
 
  module.exports = router;
