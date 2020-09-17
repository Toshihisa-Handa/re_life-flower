var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り


//日記編集画面へのルーティング
router.get('/:id',(req, res)=>{
    connection.query('SELECT * FROM diary WHERE id = ?',[req.params.id],(error,result)=>{
      res.render('diaryEdit.ejs',{item:result[0]});
      console.log(result[0])
    })
  })
 
  module.exports = router;
