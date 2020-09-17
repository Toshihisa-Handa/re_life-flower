var express = require('express');
var router = express.Router();
const path = require('path')
router.use(express.static('public'));
router.use(express.static(path.join(__dirname, 'public')))


let flower_c = require('../controllers/flower')//コントローラーフォルダの指定ファイルを読み取る

router.get('/:id',flower_c.flower)
 
  module.exports = router;
