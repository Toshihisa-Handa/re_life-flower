var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り
const moment = require('moment');//日付取得用パッケージ読み込み


//日記編集画面の内容に更新するルーティング

  router.post('/:id',(req,res)=>{
   var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
     connection.query('UPDATE flower SET name = ?, price = ?, feature = ?, tag = ?, text = ? , created_at = ? WHERE id = ?',[req.body.name, req.body.price, req.body.feature, req.body.tag, req.body.text, createdAt, req.params.id],function (error, result) {  
         res.redirect('/frege');
       });
 });
 

  module.exports = router;
