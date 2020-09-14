var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り
const path = require('path')
router.use(express.static('public'));
router.use(express.static(path.join(__dirname, 'public')))

//日記編集画面へのルーティング
router.get('/:id',(req, res)=>{
    // connection.query('SELECT * FROM shop WHERE id = ?',[req.params.id],(error,result)=>{
    connection.query('SELECT D.image AS dimg, F.image AS fimg, S.id, S.user_id, S.name, S.title, S.account_name, S.web, S.email, S.tell, S.open, S.close, S.holiday, S.location, S.map, S.account_img, S.shop_img, S.img1, S.img2, S.message, S.comment, S.created_at FROM shop S LEFT JOIN diary D ON S.user_id = D.user_id LEFT JOIN flower F ON S.user_id = F.user_id WHERE S.id = ?',[req.params.id],(error,result)=>{
      res.render('shop.ejs',{item:result[0]});
      console.log(result[0])
    })
  })
 
  module.exports = router;
