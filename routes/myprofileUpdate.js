var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り
const moment = require('moment');//日付取得用パッケージ読み込み


//日記編集画面の内容に更新するルーティング

  router.post('/:id',(req,res)=>{
   var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
     connection.query('UPDATE shop SET name = ?, title = ?, created_at = ? WHERE id = ?',[req.body.name, req.body.title, createdAt, req.params.id],function (error, result) {  
         res.redirect('/myprofile');
       });
 });
 

  module.exports = router;
