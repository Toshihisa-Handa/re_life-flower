var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り
const moment = require('moment');//日付取得用パッケージ読み込み


router.get('/',(req, res)=>{
   res.render('register.ejs', {
       title:'新規会員登録'
   });
});

router.post('/', function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  var emailExistsQuery = 'SELECT * FROM user WHERE email = "' + email + '" LIMIT 1'; // 追加
  var registerQuery = 'INSERT INTO user (name, email, password, created_at) VALUES ("' + name + '", ' + '"' + email + '", ' + '"' + password + '", ' + '"' + createdAt + '")'; // 変更
  connection.query(emailExistsQuery, function(err, email) {
    var emailExists = email.length;
    if (emailExists) {
      res.render('register.ejs', {
        title: '新規会員登録',
        emailExists: '既に登録されているメールアドレスです'
      });
    } else {
      connection.query(registerQuery, function(err, rows) {
        res.redirect('/login');
      });
    }
  });
});

module.exports = router;
