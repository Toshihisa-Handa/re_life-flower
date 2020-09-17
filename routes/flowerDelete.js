var express = require('express');
var router = express.Router();

let flower_c = require('../controllers/flower')//コントローラーフォルダの指定ファイルを読み取る

//削除のルーティング
router.get('/:id',flower_c.flowerDelete)

  module.exports = router;
