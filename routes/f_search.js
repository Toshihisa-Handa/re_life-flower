var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り


router.get('/', (req, res) => {
    let kensaku = req.query.kensaku;
    var sql = "SELECT S.name AS shopname, S.location AS basyo, F.id, F.user_id, F.name, F.image, F.price, F.feature, F.tag, F.text,ifnull(U.name, \'名無し\') AS uname, DATE_FORMAT(F.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM flower F LEFT OUTER JOIN user U ON F.user_id = U.user_id JOIN shop S ON F.user_id = S.user_id WHERE S.name LIKE ? OR S.location LIKE ? OR F.name LIKE ? OR F.feature LIKE ? OR F.tag LIKE ? OR F.name LIKE ? ORDER BY F.created_at DESC"; 

    connection.query(sql,["%"+kensaku+"%","%"+kensaku+"%","%"+kensaku+"%","%"+kensaku+"%","%"+kensaku+"%","%"+kensaku+"%"],(error,results)=>{
        res.render('flowers.ejs',{items:results})
        console.log(results)
      })
  })	;

module.exports = router;
