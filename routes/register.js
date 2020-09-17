var express = require('express');
var router = express.Router();


let main_c = require('../controllers/main')//コントローラーフォルダの指定ファイルを読み取る


router.get('/',main_c.register);
router.post('/',main_c.register_post);

module.exports = router;
