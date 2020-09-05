var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り

//削除のルーティング
router.get('/diaryDelete/:id',(req,res)=>{
    connection.query('DELETE FROM imgtest WHERE id = ?',[req.params.id],(error,results)=>{
      res.redirect('/frege')
    })
  })

  module.exports = router;
