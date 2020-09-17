const connection = require('../mysqlConnection');//db接続読み取り
const moment = require('moment');//日付取得用パッケージ読み込み
const multer = require('multer');//画像取得ようパッケージ（multer）読み込み


//d_insert
exports.d_insert = (req, res) => {
    res.sendFile(path.join(__dirname, 'views/drege.ejs'))
  }


//d_search
exports.d_search = (req, res) => {
    let kensaku = req.query.kensaku;
      var sql = "SELECT S.name AS shopname, S.location AS basyo, D.id, D.user_id, D.title, D.image, D.tag, D.text,ifnull(U.name, \'名無し\') AS name, DATE_FORMAT(D.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM diary D LEFT OUTER JOIN user U ON D.user_id = U.user_id JOIN shop S ON D.user_id = S.user_id WHERE S.name LIKE ? OR S.location LIKE ? OR D.title LIKE ? OR D.tag LIKE ? OR D.text LIKE ? ORDER BY D.created_at DESC"; // 変更
        connection.query(sql,["%"+kensaku+"%","%"+kensaku+"%","%"+kensaku+"%","%"+kensaku+"%","%"+kensaku+"%"],(error,results)=>{
          res.render('diarys.ejs',{items:results})
          console.log(results)
        })
    }

//diary.js
exports.diary = (req, res)=>{
    connection.query('SELECT S.name AS shopname, D.id, D.user_id, D.image, D.title, D.tag, D.text FROM diary AS D LEFT JOIN shop S ON D.user_id = S.user_id WHERE D.id = ?',[req.params.id],(error,result)=>{
      res.render('diary.ejs',{item:result[0]});
        console.log(result[0])
      })
    }

//diaryDelete
exports.diaryDelete = (req,res)=>{
    connection.query('DELETE FROM diary WHERE id = ?',[req.params.id],(error,results)=>{
      res.redirect('/drege')
    })
  }


//dearyEdit
exports.diaryEdit = (req, res)=>{
    connection.query('SELECT * FROM diary WHERE id = ?',[req.params.id],(error,result)=>{
      res.render('diaryEdit.ejs',{item:result[0]});
      console.log(result[0])
    })
  }

//diarys
exports.diarys = (req, res) => {
    var sql = 'SELECT S.name AS shopname, S.location AS basyo, D.id, D.user_id, D.title, D.image, D.tag, D.text,ifnull(U.name, \'名無し\') AS name, DATE_FORMAT(D.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM diary D LEFT OUTER JOIN user U ON D.user_id = U.user_id JOIN shop S ON D.user_id = S.user_id  ORDER BY D.created_at DESC'; // 変更
      connection.query(sql,(error,results)=>{
        res.render('diarys.ejs',{items:results})
        console.log(results)
      })
  }

//diaryUpdate
exports.diaryUpdate =(req,res)=>{
    var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
      connection.query('UPDATE diary SET title = ?, tag = ?, text = ? , created_at = ? WHERE id = ?',[req.body.title, req.body.tag, req.body.text, createdAt, req.params.id],function (error, result) {  
          res.redirect('/drege');
        });
  }

//drege
exports.drege =  (req, res) => {
    var userId = req.session.user_id? req.session.user_id: 0;
    var sql = 'SELECT D.id, D.user_id, D.title, D.image, D.tag, D.text,ifnull(U.name, \'名無し\') AS name, DATE_FORMAT(D.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM diary D LEFT OUTER JOIN user U ON D.user_id = U.user_id WHERE D.user_id = ' + userId + '  ORDER BY D.created_at DESC'; // 変更
    connection.query(sql,(error,results)=>{
        res.render('drege.ejs',{items:results})
      })
  }