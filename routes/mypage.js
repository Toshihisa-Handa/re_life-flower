var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り

router.get('/', (req, res) => {
 
    var sql = 'SELECT * FROM shop'; // 変更
    connection.query(sql,(error,results)=>{
        res.render('mypage.ejs',{items:results})
        // console.log(results)
      })
  })	;
module.exports = router;
