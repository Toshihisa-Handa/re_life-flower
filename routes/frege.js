var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り



router.get('/', (req, res) => {
    connection.query('SELECT * FROM imgtest',(error,results)=>{
      res.render('frege.ejs',{items:results})
      console.log(results)
    })
})	;

module.exports = router;
