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
  
  var userId = req.session.user_id? req.session.user_id: 0; 
  var image1 = req.files.account_img
  var image2 = req.files.shop_img
  var image3 = req.files.img1
  var image4 = req.files.img2
 
  if(image1 == undefined && image2 == undefined && image3 == undefined && image4 == undefined){
    res.redirect('/myprofile')
    return//ここでリターンをしないと下のif文がリダイレクト処理後も動作してしまいエラーになる。ちゃんとリターンで止めてあげる。参考：https://casualdevelopers.com/tech-tips/how-to-fix-the-error-of-cannot-set-headers-after-they-are-sent-to-the-client/
  }
  if(image1 == undefined){//アカウント画像があるかチェック
    image1 = ''
  }else{
    image1 = req.files.account_img[0].filename
  }
  if(image2 == undefined){//ショップ画像があるかチェック
    image2 = ''
  }else{
    image2 = req.files.shop_img[0].filename
  }
  if(image3 == undefined){//画像1があるかチェック
    image3 = ''
  }else{
    image3 = req.files.img1[0].filename
  }
  if(image4 == undefined){//画像2があるかチェック
    image4 = ''
  }else{
    image4 = req.files.img2[0].filename
  }


  var inputF = [image1,image2,image3,image4]
  var sql='UPDATE shop SET account_img = ?, shop_img = ?, img1 = ?, img2 = ? WHERE user_id = '+ userId +''; 
  connection.query(sql,inputF,(error,result)=>{
    res.redirect('/myprofile')

  })

  })

  module.exports = router;

