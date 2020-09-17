var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り
const path = require('path')
router.use(express.static('public'));
router.use(express.static(path.join(__dirname, 'public')))

router.get('/:id',(req, res)=>{
    connection.query('SELECT S.name AS shopname, F.id, F.user_id, F.image, F.name, F.price, F.feature, F.text FROM flower AS F LEFT JOIN shop S ON F.user_id = S.user_id WHERE F.id = ?',[req.params.id],(error,result)=>{
      res.render('flower.ejs',{item:result[0]});
      console.log('testttttttttt')
    })
  })
 
  module.exports = router;
