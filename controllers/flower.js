const connection = require('../mysqlConnection');
const multer = require('multer');//画像取得ようパッケージ（multer）読み込み
const moment = require('moment');//日付取得用パッケージ読み込み

//f_insert
exports.f_insert =(req, res) => {
    res.sendFile(path.join(__dirname, 'views/frege.ejs'))
  }

//f_search
exports.f_search = (req, res) => {
    let kensaku = req.query.kensaku;
    var sql = "SELECT S.name AS shopname, S.location AS basyo, F.id, F.user_id, F.name, F.image, F.price, F.feature, F.tag, F.text,ifnull(U.name, \'名無し\') AS uname, DATE_FORMAT(F.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM flower F LEFT OUTER JOIN user U ON F.user_id = U.user_id JOIN shop S ON F.user_id = S.user_id WHERE S.name LIKE ? OR S.location LIKE ? OR F.name LIKE ? OR F.feature LIKE ? OR F.tag LIKE ? OR F.name LIKE ? ORDER BY F.created_at DESC"; 

    connection.query(sql,["%"+kensaku+"%","%"+kensaku+"%","%"+kensaku+"%","%"+kensaku+"%","%"+kensaku+"%","%"+kensaku+"%"],(error,results)=>{
        res.render('flowers.ejs',{items:results})
        console.log(results)
      })
  }

  //flower
  exports.flower =(req, res)=>{
    connection.query('SELECT S.name AS shopname, F.id, F.user_id, F.image, F.name, F.price, F.feature, F.text FROM flower AS F LEFT JOIN shop S ON F.user_id = S.user_id WHERE F.id = ?',[req.params.id],(error,result)=>{
      res.render('flower.ejs',{item:result[0]});
    })
  }


  
//fcomment_post
exports.fcomment_post =  (req, res) => {
  var userId = req.session.user_id? req.session.user_id: 0; 
  var flowerId = req.params.flower_id;
  var fcomment = req.body.fcomment;
  var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  var sql = 'INSERT INTO fcomment (flower_id, fcomment, created_at, user_id) VALUES (?,?,?,?)';
  connection.query(sql,[flowerId, fcomment, createdAt, userId],(error,results)=>{
    res.redirect('/flower/' + flowerId);
    console.log('insert=============')
    console.log(flowerId)
  })
}


  //flowerDelete
  exports.flowerDelete = (req,res)=>{
    connection.query('DELETE FROM flower WHERE id = ?',[req.params.id],(error,results)=>{
      res.redirect('/frege')
    })
  }

  //flowerEdit
  exports.flowerEdit = (req, res)=>{
    connection.query('SELECT * FROM flower WHERE id = ?',[req.params.id],(error,result)=>{
      res.render('flowerEdit.ejs',{item:result[0]});
      console.log(result[0])
    })
  }

  //flowers 
  exports.flowers =  (req, res) => {
    var sql = 'SELECT S.name AS shopname, S.location AS basyo, F.id, F.user_id, F.name, F.image, F.price, F.feature, F.tag, F.text,ifnull(U.name, \'名無し\') AS uname, DATE_FORMAT(F.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM flower F LEFT OUTER JOIN user U ON F.user_id = U.user_id JOIN shop S ON F.user_id = S.user_id ORDER BY F.created_at DESC'; 
    connection.query(sql,(error,results)=>{
        res.render('flowers.ejs',{items:results})
        console.log(results)
      })
  }

  //flowerUpdate
  exports.flowerUpdate = (req,res)=>{
    var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
      connection.query('UPDATE flower SET name = ?, price = ?, feature = ?, tag = ?, text = ? , created_at = ? WHERE id = ?',[req.body.name, req.body.price, req.body.feature, req.body.tag, req.body.text, createdAt, req.params.id],function (error, result) {  
          res.redirect('/frege');
        });
  }

  //frege
  exports.frege = (req, res) => {
    var userId = req.session.user_id? req.session.user_id: 0;
    var sql = 'SELECT F.id, F.user_id, F.name, F.image, F.price, F.feature, F.tag, F.text,ifnull(U.name, \'名無し\') AS uname, DATE_FORMAT(F.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM flower F LEFT OUTER JOIN user U ON F.user_id = U.user_id WHERE F.user_id = ' + userId + '  ORDER BY F.created_at DESC'; // 変更
    //sqlのSELECT文内のカラム(user_idやimageなど）の順番はテーブル内の順番と異なっていても機能する。
    connection.query(sql,(error,results)=>{
        res.render('frege.ejs',{items:results})
        console.log(results)
      })
  }

