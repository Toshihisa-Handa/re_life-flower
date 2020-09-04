const express = require('express');
const router = express.Router();
const connection = require('../mysqlConnection');
const multer = require('multer')//multer読み込み
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
  res.sendFile(path.join(__dirname, 'views/frege.ejs'))
})	;

router.post('/', upload.single('file'), function (req, res, next) {
  console.log(req.file);
  console.log(req.file.filename);
  // var boardId = req.params.board_id;
  // var userId = req.session.user_id? req.session.user_id: 0;
  var title = req.body.title;
  var sql='INSERT INTO imgtest (title, image) VALUES(?,?)';
  connection.query(sql, [title,req.file.filename],(error,result)=>{
    res.redirect('/frege')
  })
  })

  module.exports = router;