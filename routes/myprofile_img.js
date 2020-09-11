const express = require('express');
const router = express.Router();
const connection = require('../mysqlConnection');
const multer = require('multer');//画像取得ようパッケージ（multer）読み込み
const moment = require('moment');//日付取得用パッケージ読み込み

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9)+file.originalname)
    }
  })
//   const upload = multer({ dest: './public/images/uploads' })//ファイルの保存先指定
  const upload = multer({ storage: storage })

const path = require('path')

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/myprofile.ejs'))
})	;

var cpUpload = upload.fields([{
                  name:'account_img', maxCount:1
                },{
                  name:'shop_img', maxCount:1
                },{
                    name:'img1', maxCount:1
                  },{
                    name:'img2', maxCount:1
                  }
            ]);


//送信する画像が1つの時第二引数は 「upload.single('account_img')」を使う
router.post('/', cpUpload, function (req, res, next) {
//   console.log(req.file);
//   console.log(req.file.filename);
  var userId = req.session.user_id? req.session.user_id: 0; 

//   var sql='INSERT INTO shop (account_img) VALUES(?)';
  var sql='UPDATE shop SET account_img = ?, shop_img = ?, img1 = ?, img2 = ?, WHERE user_id = '+ userId +''; 
  connection.query(sql, [req.files['account_img'].filename, req.files['shop_img'].filename, req.files['img1'].filename, req.files['img2'].filename],(error,result)=>{
    res.redirect('/myprofile')
  })
  })

  module.exports = router;