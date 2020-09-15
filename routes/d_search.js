var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り

router.get('/', (req, res) => {
  let kensaku = req.query.kensaku;
    var sql = "SELECT S.name AS shopname, S.location AS basyo, D.id, D.user_id, D.title, D.image, D.tag, D.text,ifnull(U.name, \'名無し\') AS name, DATE_FORMAT(D.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM diary D LEFT OUTER JOIN user U ON D.user_id = U.user_id JOIN shop S ON D.user_id = S.user_id WHERE S.name LIKE '%"+kensaku+"%' OR S.location LIKE '%"+kensaku+"%' ORDER BY D.created_at DESC"; // 変更
      connection.query(sql,(error,results)=>{
        res.render('diarys.ejs',{items:results})
        console.log(results)
      })
  })	;

module.exports = router;


// router.get('/',(req, res)=>{
//   // console.log("ゲット")
//   // console.log(res)
//   // console.log(req.query.kensaku)
//   // console.log('resここまでだよresここまでだよresここまでだよresここまでだよ')
// let kensaku = req.query.kensaku;
//   var sql = "SELECT S.id, S.user_id, S.name AS shopname, S.account_img, S.shop_img, S.close, S.open, S.feature, ifnull(U.name, \'名無し\') AS username, DATE_FORMAT(S.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM shop S LEFT OUTER JOIN user U ON S.user_id = U.user_id WHERE S.name LIKE '%"+kensaku+"%' ORDER BY S.created_at DESC"; 
//   // var sql = "SELECT S.id, S.user_id, S.name AS shopname, S.account_img, S.shop_img, S.close, S.open, S.feature, ifnull(U.name, \'名無し\') AS username, DATE_FORMAT(S.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM shop S LEFT OUTER JOIN user U ON S.user_id = U.user_id  ORDER BY S.created_at DESC"; 
//     connection.query(sql,(error,results)=>{
//       res.render('s_search.ejs',{items:results});

//     })

// })