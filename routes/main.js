var express = require('express');
var router = express.Router();
let main_c = require('../controllers/main')//コントローラーフォルダの指定ファイルを読み取る

//topページ
router.get('/',main_c.top);


//loginページ
router.get('/login',main_c.login );
router.post('/login', main_c.login_post);

//logoutページ
router.get('/logout',main_c.logout);

//registerページ
router.get('/register',main_c.register);
router.post('/register',main_c.register_post);







module.exports = router;
