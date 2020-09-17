var express = require('express');
var router = express.Router();

let hoge = require('../controllers/hoge')//コントローラーフォルダのhogeファイルを読み取る


router.get('/', hoge.test);//hogeファイルのtest関数を実行
router.post('/', hoge.submit);//hogeファイルのsubmit関数を実行

module.exports = router;
