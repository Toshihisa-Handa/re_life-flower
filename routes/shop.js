var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り
const path = require('path')
router.use(express.static('public'));
router.use(express.static(path.join(__dirname, 'public')))

//日記編集画面へのルーティング
router.get('/:id',(req, res)=>{
    var userId = req.session.user_id? req.session.user_id: 0;
    var flowers = 'SELECT F.id, F.user_id, F.name, F.image, F.price, F.feature, F.tag, F.text,ifnull(U.name, \'名無し\') AS uname, DATE_FORMAT(F.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM flower F LEFT OUTER JOIN user U ON F.user_id = U.user_id WHERE F.user_id = ' + userId + '  ORDER BY F.created_at DESC'; // 変更
    var diarys = 'SELECT D.id, D.user_id, D.title, D.image, D.tag, D.text,ifnull(U.name, \'名無し\') AS name, DATE_FORMAT(D.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM diary D LEFT OUTER JOIN user U ON D.user_id = U.user_id WHERE D.user_id = ' + userId + '  ORDER BY D.created_at DESC'; // 変更
connection.query(flowers,(error,flower)=>{
  connection.query(diarys,(error,diary)=>{
  // connection.query('SELECT * FROM shop WHERE id = ?',[req.params.id],(error,result)=>{
    connection.query('SELECT D.image AS dimg, F.image AS fimg, S.id, S.user_id, S.name, S.title, S.account_name, S.web, S.email, S.tell, S.open, S.close, S.holiday, S.location, S.map, S.account_img, S.shop_img, S.img1, S.img2, S.message, S.comment, S.created_at FROM shop S LEFT JOIN diary D ON S.user_id = D.user_id LEFT JOIN flower F ON S.user_id = F.user_id WHERE S.id = ?',[req.params.id],(error,result)=>{
      res.render('shop.ejs',{item:result, fitem:flower, ditem:diary});//renderではなく、resultを別の配列に入れておき、
      console.log(result)
    })
  })
})
  
    //renderで返す（保留）レンダーだと情報が空
    //connection.queryはおそらく非同期　その処理が終わる前に入れ子にしてやるパターンもありかもしれない。
  })
 
  module.exports = router;
