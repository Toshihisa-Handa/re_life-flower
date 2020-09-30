const connection = require('../mysqlConnection');//db接続読み取り
const moment = require('moment');//日付取得用パッケージ読み込み


//mypage
exports.mypage = (req, res) => {
    var sql = 'SELECT * FROM shop'; 
    connection.query(sql,(error,results)=>{
        res.render('mypage.ejs',{items:results})
      })
  }

//myprofile
exports.myprofile = (req, res) => {
    var userId = req.session.user_id? req.session.user_id: 0;
    var sql ='SELECT * FROM shop where user_id = '+userId+''
    connection.query(sql,(error,results)=>{
        res.render('myprofile.ejs',{items:results})
      })
  }

//myprofileEdit
exports.myprofileEdit = (req, res)=>{
    connection.query('SELECT * FROM shop WHERE id = ?',[req.params.id],(error,result)=>{
      res.render('myprofileEdit.ejs',{item:result[0]});
    })
  }


//myprofileUpdate
exports.myprofileUpdate = (req,res)=>{
    var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    var sql = 'UPDATE shop SET name = ?, title = ?, account_name = ?, web = ?, email = ?, tell = ?, open = ?, close = ?, holiday = ?, location = ?, map = ?, message = ?, comment = ?, feature = ?, created_at = ? WHERE id = ?'
      connection.query(sql,[req.body.name, req.body.title, req.body.account_name, req.body.web, req.body.email, req.body.tell, req.body.open, req.body.close, req.body.holiday, req.body.location, req.body.map, req.body.message, req.body.comment, req.body.feature, createdAt, req.params.id],function (error, result) {  
          res.redirect('/myprofile');
        });
  }


//s_search
exports.s_search = (req, res)=>{
  let kensaku = req.query.kensaku;
  var sql = "SELECT S.id, S.user_id, S.name AS shopname, S.location AS basyo, S.account_img, S.shop_img, S.close, S.open, S.feature, ifnull(U.name, \'名無し\') AS username, DATE_FORMAT(S.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM shop S LEFT OUTER JOIN user U ON S.user_id = U.user_id WHERE S.name LIKE ? OR S.location LIKE ? OR S.feature LIKE ? ORDER BY S.created_at DESC"; 
   connection.query(sql,["%"+kensaku+"%","%"+kensaku+"%","%"+kensaku+"%"],(error,results)=>{
    res.render('shops.ejs',{items:results});
  
      })
  }


//shop
exports.shop = (req, res)=>{
      var sql = 'SELECT D.image AS dimg, F.image AS fimg, S.id, S.user_id, S.name, S.title, S.account_name, S.web, S.email, S.tell, S.open, S.close, S.holiday, S.location, S.map, S.account_img, S.shop_img, S.img1, S.img2, S.message, S.comment, S.created_at FROM shop S LEFT JOIN diary D ON S.user_id = D.user_id LEFT JOIN flower F ON S.user_id = F.user_id WHERE S.id = ?';
      connection.query(sql,[req.params.id],(error,result)=>{
        console.log('リザルトの情報を下でとりたい＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝')
        console.log(result[0])
        console.log('リザルトの情報をとった＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝')

          let uid = result[0].user_id;
          var flowers = 'SELECT * FROM flower WHERE user_id = '+ uid +''
          var diarys = 'SELECT * FROM diary WHERE user_id = '+ uid +''
            connection.query(flowers,(error,flower)=>{
              console.log('お花の情報を取得＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝')
              console.log(flowers)
                connection.query(diarys,(error,diary)=>{
                  console.log('日記の情報を取得＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝')
                  console.log(diarys)

                    res.render('shop.ejs',{fitem:flower, ditem:diary, item:result});
          })
        })
      })
    }

//shops
exports.shops = (req, res) => {
    var sql = 'SELECT S.id, S.user_id, S.name AS shopname, S.location AS basyo, S.account_img, S.shop_img, S.close, S.open, S.feature, ifnull(U.name, \'名無し\') AS username, DATE_FORMAT(S.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM shop S LEFT OUTER JOIN user U ON S.user_id = U.user_id  ORDER BY S.created_at DESC'; 
      connection.query(sql,(error,results)=>{
        res.render('shops.ejs',{items:results})
        console.log('ショプのデーター＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝')
        console.log(results)
      })
  }