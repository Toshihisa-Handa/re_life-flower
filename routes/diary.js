var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り
const path = require('path')
router.use(express.static('public'));
router.use(express.static(path.join(__dirname, 'public')))

//日記編集画面へのルーティング
router.get('/:id',(req, res)=>{
  connection.query('SELECT S.name AS shopname, D.id, D.user_id, D.image, D.title, D.tag, D.text FROM diary AS D LEFT JOIN shop S ON D.user_id = S.user_id WHERE D.id = ?',[req.params.id],(error,result)=>{
    res.render('diary.ejs',{item:result[0]});
      console.log(result[0])
    })
  })
 
  module.exports = router;
