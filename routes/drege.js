var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り



router.get('/', (req, res) => {
    connection.query('SELECT *, DATE_FORMAT(created_at, \'%Y年%m月%d日 %k時%i分\') AS created_at FROM diary',(error,results)=>{
      res.render('drege.ejs',{items:results})
      console.log(results)
    })
})	;

module.exports = router;
