var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り



router.get('/', (req, res) => {
 
      res.render('myprofile.ejs')
      console.log(results)
    
});

module.exports = router;
