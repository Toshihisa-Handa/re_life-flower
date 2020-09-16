var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り
const path = require('path')
router.use(express.static('public'));
router.use(express.static(path.join(__dirname, 'public')))

//日記編集画面へのルーティング
router.get('/:id',(req, res)=>{
  // console.log(req.params.id)// ページのid
    // var uid = req.params.id;//これはshopテーブルのid
    var shop = 'SELECT * FROM shop'
   
    var sql = 'SELECT D.image AS dimg, F.image AS fimg, S.id, S.user_id, S.name, S.title, S.account_name, S.web, S.email, S.tell, S.open, S.close, S.holiday, S.location, S.map, S.account_img, S.shop_img, S.img1, S.img2, S.message, S.comment, S.created_at FROM shop S LEFT JOIN diary D ON S.user_id = D.user_id LEFT JOIN flower F ON S.user_id = F.user_id WHERE S.id = ?';
  // connection.query('SELECT * FROM shop WHERE id = ?',[req.params.id],(error,result)=>{
    connection.query(sql,[req.params.id],(error,result)=>{
        let uid = result[0].user_id;
        var flowers = 'SELECT * FROM flower WHERE user_id = '+ uid +''
        var diarys = 'SELECT * FROM diary WHERE user_id = '+ uid +''

      connection.query(flowers,(error,flower)=>{
        connection.query(diarys,(error,diary)=>{
          res.render('shop.ejs',{fitem:flower, ditem:diary, item:result});//renderではなく、resultを別の配列に入れておき、
          // console.log(result)
          console.log('いいいいいいいいいいいいいいいいいいい')
          console.log(uid)
          console.log(flower)
          console.log(diary)
          console.log(result[0].user_id)
          // console.log(result)

        })


      })
    
    })
  
    //renderで返す（保留）レンダーだと情報が空
    //connection.queryはおそらく非同期　その処理が終わる前に入れ子にしてやるパターンもありかもしれない。
  })
 
  module.exports = router;
