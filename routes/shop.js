var express = require('express');
var router = express.Router();
const path = require('path')
router.use(express.static('public'));
router.use(express.static(path.join(__dirname, 'public')))
let shop_c = require('../controllers/shop')//コントローラーフォルダの指定ファイルを読み取る


router.get('/:id', shop_c.shop)
 
  module.exports = router;
