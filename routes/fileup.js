const express = require('express');
const router = express.Router();
const connection = require('../mysqlConnection');
const multer = require('multer')//multer読み込み
const upload = multer({ dest: './public/images/uploads' })//ファイルの保存先指定
const path = require('path')

router.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/frege.ejs')))	;

router.post('/', upload.single('file'), function (req, res, next) {
    res.send(req.file.originalname +'ファイルのアップロードが完了しました。');
  })

  module.exports = router;