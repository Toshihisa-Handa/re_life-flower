var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り



router.get('/',(req, res)=>{
    console.log("ゲット")
    // console.log(res)
    console.log(req.query.kensaku)
    console.log('resここまでだよresここまでだよresここまでだよresここまでだよ')
  let kensaku = req.query.kensaku;
    var sql = "SELECT S.id, S.user_id, S.name AS shopname, S.location AS basyo, S.account_img, S.shop_img, S.close, S.open, S.feature, ifnull(U.name, \'名無し\') AS username, DATE_FORMAT(S.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM shop S LEFT OUTER JOIN user U ON S.user_id = U.user_id WHERE S.name LIKE ? OR S.location LIKE ? OR S.feature LIKE ? ORDER BY S.created_at DESC"; 
    // var sql = "SELECT S.id, S.user_id, S.name AS shopname, S.account_img, S.shop_img, S.close, S.open, S.feature, ifnull(U.name, \'名無し\') AS username, DATE_FORMAT(S.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM shop S LEFT OUTER JOIN user U ON S.user_id = U.user_id  ORDER BY S.created_at DESC"; 
      connection.query(sql,["%"+kensaku+"%","%"+kensaku+"%","%"+kensaku+"%"],(error,results)=>{
        res.render('shops.ejs',{items:results});
  
      })

  })



 
  module.exports = router;
