var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り
const moment = require('moment');//日付取得用パッケージ読み込み


//日記編集画面の内容に更新するルーティング

  router.post('/:id',(req,res)=>{
   var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
   var sql = 'UPDATE shop SET name = ?, title = ?, account_name = ?, web = ?, email = ?, tell = ?, open = ?, close = ?, holiday = ?, location = ?, map = ?, message = ?, comment = ?, feature = ?, created_at = ? WHERE id = ?'
     connection.query(sql,[req.body.name, req.body.title, req.body.account_name, req.body.web, req.body.email, req.body.tell, req.body.open, req.body.close, req.body.holiday, req.body.location, req.body.map, req.body.message, req.body.comment, req.body.feature, createdAt, req.params.id],function (error, result) {  
         res.redirect('/myprofile');
       });
 });
 
  module.exports = router;
