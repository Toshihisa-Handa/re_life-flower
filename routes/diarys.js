var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り

router.get('/', (req, res) => {
    var sql = 'SELECT S.name AS shopname, S.location AS basyo, D.id, D.user_id, D.title, D.image, D.tag, D.text,ifnull(U.name, \'名無し\') AS name, DATE_FORMAT(D.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM diary D LEFT OUTER JOIN user U ON D.user_id = U.user_id JOIN shop S ON D.user_id = S.user_id  ORDER BY D.created_at DESC'; // 変更
      connection.query(sql,(error,results)=>{
        res.render('diarys.ejs',{items:results})
        console.log(results)
      })
  })	;

module.exports = router;
