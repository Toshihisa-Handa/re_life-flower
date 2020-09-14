var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り

router.get('/', (req, res) => {
    var sql = 'SELECT S.id, S.user_id, S.name, S.account_img, S.shop_img, S.close, S.open, S.feature, ifnull(U.name, \'名無し\') AS username, DATE_FORMAT(S.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM shop S LEFT OUTER JOIN user U ON S.user_id = U.user_id  ORDER BY S.created_at DESC'; 
      connection.query(sql,(error,results)=>{
        res.render('shops.ejs',{items:results})
        console.log(results)
      })
  })	;

module.exports = router;
