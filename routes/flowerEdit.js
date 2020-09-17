var express = require('express');
var router = express.Router();

let flower_c = require('../controllers/flower')//コントローラーフォルダの指定ファイルを読み取る


router.get('/:id',flower_c.flowerEdit)
 
  module.exports = router;
