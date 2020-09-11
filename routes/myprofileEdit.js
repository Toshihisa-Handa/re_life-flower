var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り

router.get('/:id',(req, res)=>{
  connection.query('SELECT * FROM shop WHERE id = ?',[req.params.id],(error,result)=>{
    res.render('myprofileEdit.ejs',{item:result[0]});
    // console.log(result[0])
  })
})

module.exports = router;
