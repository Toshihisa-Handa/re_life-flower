var express = require('express');
var router = express.Router();
const path = require('path')
router.use(express.static('public'));
router.use(express.static(path.join(__dirname, 'public')))

let diary_c = require('../controllers/diary')//コントローラーフォルダのhogeファイルを読み取る

//日記編集画面へのルーティング
router.get('/:id',diary_c.diary)
 
  module.exports = router;
