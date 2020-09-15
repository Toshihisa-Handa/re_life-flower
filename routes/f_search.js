var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り


router.get('/', (req, res) => {
    let kensaku = req.query.kensaku;
    var sql = "SELECT S.name AS shopname, S.location AS basyo, F.id, F.user_id, F.name, F.image, F.price, F.feature, F.tag, F.text,ifnull(U.name, \'名無し\') AS uname, DATE_FORMAT(F.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM flower F LEFT OUTER JOIN user U ON F.user_id = U.user_id JOIN shop S ON F.user_id = S.user_id WHERE S.name LIKE '%"+kensaku+"%' OR S.location LIKE '%"+kensaku+"%' OR F.name LIKE '%"+kensaku+"%' OR F.feature LIKE '%"+kensaku+"%' OR F.tag LIKE '%"+kensaku+"%' OR F.text LIKE '%"+kensaku+"%' ORDER BY F.created_at DESC"; 

    connection.query(sql,(error,results)=>{
        res.render('flowers.ejs',{items:results})
        console.log(results)
      })
  })	;

module.exports = router;
