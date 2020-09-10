var express = require('express');
var router = express.Router();
const connection = require('../mysqlConnection');//db接続読み取り



router.get('/', (req, res) => {
  // var body = req.body;
  // console.log(body);
  var userId = req.session.user_id? req.session.user_id: 0;
  // var sql = 'SELECT S.id, S.user_id, S.name, S.title, S.account_name, S.web, S.email, S.tell, S.open, S.close, S.holiday, S.location, S.map, S.account_img, S.img1, S.img2, S.message, S.comment, ifnull(U.name, \'名無し\') AS name, DATE_FORMAT(S.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM shop S LEFT OUTER JOIN user U ON S.user_id = U.user_id WHERE S.user_id = ' + userId + '  ORDER BY S.created_at DESC'; // 変更
  var sql ='SELECT * FROM shop where user_id = '+userId+''
  
  connection.query(sql,(error,results)=>{
      res.render('myprofile.ejs',{items:results})
      console.log(results)
    })
})	;

module.exports = router;


// router.get('/', (req, res) => {
//   var userId = req.session.user_id? req.session.user_id: 0;
// //   var sql = 'SELECT D.id, D.user_id, D.title, D.image, D.tag, D.text,ifnull(U.name, \'名無し\') AS name, DATE_FORMAT(D.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM diary D LEFT OUTER JOIN user U ON D.user_id = U.user_id WHERE D.user_id = ' + userId + '  ORDER BY D.created_at DESC'; // 変更
//    var sql = 'SELECT * FROM shop LEFT OUTER JOIN user ON shop.user_id = user.user_id WHERE shop.user_id = ' + userId + ''; // 変更
// //  var sql = 'SELECT * FROM user INNER JOIN shop ON user.user_id = shop.user_id WHERE user.user_id =' + userId + ' ';
//   connection.query(sql,(error,result)=>{
//       res.render('myprofile.ejs',{item:result[0]})
//       console.log(result)
//     })
// })	;