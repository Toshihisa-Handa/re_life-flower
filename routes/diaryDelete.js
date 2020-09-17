var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り

//削除のルーティング
router.get('/:id',(req,res)=>{
    connection.query('DELETE FROM diary WHERE id = ?',[req.params.id],(error,results)=>{
      res.redirect('/drege')
    })
  })

  module.exports = router;
