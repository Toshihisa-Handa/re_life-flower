var express = require('express');
var router = express.Router();



let diary_c = require('../controllers/diary')//コントローラーフォルダの指定ファイルを読み取る

  router.post('/:id',diary_c.diaryUpdate);
 

  module.exports = router;
