var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');

// router.get('/',(req, res)=>{
//     // res.renderで指定ファイルの画面表示させる
//     res.render('frege.ejs');
// });


router.get('/', (req, res) => {
    connection.query('SELECT * FROM imgtest',(error,results)=>{
      res.render('frege.ejs',{items:results})
      console.log(results)
    })
})	;

module.exports = router;
