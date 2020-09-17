var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り



router.get('/', (req, res) => {
  var userId = req.session.user_id? req.session.user_id: 0;
  var sql = 'SELECT F.id, F.user_id, F.name, F.image, F.price, F.feature, F.tag, F.text,ifnull(U.name, \'名無し\') AS uname, DATE_FORMAT(F.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM flower F LEFT OUTER JOIN user U ON F.user_id = U.user_id WHERE F.user_id = ' + userId + '  ORDER BY F.created_at DESC'; // 変更
  //sqlのSELECT文内のカラム(user_idやimageなど）の順番はテーブル内の順番と異なっていても機能する。
  connection.query(sql,(error,results)=>{
      res.render('frege.ejs',{items:results})
      console.log(results)
    })
})	;

module.exports = router;
