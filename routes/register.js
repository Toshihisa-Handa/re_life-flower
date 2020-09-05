var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り
const moment = require('moment');//日付取得用パッケージ読み込み


router.get('/',(req, res)=>{
   res.render('register.ejs', {
       title:'新規会員登録'
   });
});

router.post('/',(req,res)=>{
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  // console.log('こんそるこんそるこんそるこんそるこんそるこんそるこんそるこんそるこんそるこんそる');
  // console.log(req.body);
  connection.query('INSERT INTO user (name, email, password, created_at) VALUES (?, ?, ?, ?)',[name, email, password, createdAt],(error, results)=>{
      res.redirect('/login');
  });

});

module.exports = router;
