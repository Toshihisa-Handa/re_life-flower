var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り
const moment = require('moment');//日付取得用パッケージ読み込み


router.get('/',(req, res, next)=>{
   res.render('register.ejs', {
       title:'新規会員登録'
   });
});

router.post('/', function(req, res, next) {
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
      connection.query(registerQuery, function(err, rows) {//userテーブルの記述
        var userId = rows.insertId;
        console.log(userId)
        console.log(name)
        // console.log(rows.affectedRows)
        // console.log(rows)
        // console.log(rows.insertId)
        // console.log('欲しい情報：'+ rows.insertId)
        connection.query('INSERT INTO shop(user_id, account_name) VALUES(?,?)',[userId, name],(error,results)=>{
            
          res.redirect('/login');
        });
      });
    }
  });
});

module.exports = router;
