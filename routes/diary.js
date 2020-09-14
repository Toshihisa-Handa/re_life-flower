var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り
const path = require('path')
router.use(express.static('public'));
router.use(express.static(path.join(__dirname, 'public')))

//日記編集画面へのルーティング
router.get('/:id',(req, res)=>{
    connection.query('SELECT * FROM diary WHERE id = ?',[req.params.id],(error,result)=>{
      res.render('diary.ejs',{item:result[0]});
      console.log(result[0])
    })
  })
 
  module.exports = router;
