const express = require('express');
const router = express.Router();
const connection = require('../mysqlConnection');
const multer = require('multer');//画像取得ようパッケージ（multer）読み込み
const moment = require('moment');//日付取得用パッケージ読み込み


// console.log('グローバル：'+ search)


router.post('/', (req, res) => {
  // export let search = req.body.search;
    console.log(req.body.search)//inputタグの値が入る
    console.log("post検索："+ req.body.search)
    res.redirect('/d_search')//ここで下のget処理に移動する
  });


  router.get('/',(req,res)=>{
      // import { search } from './d_search.js';
    //ここに上のpostで取得した値を取得したい。
    var sql = 'SELECT D.id, D.user_id, D.title, D.image, D.tag, D.text,ifnull(U.name, \'名無し\') AS name, DATE_FORMAT(D.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM diary D LEFT OUTER JOIN user U ON D.user_id = U.user_id  ORDER BY D.created_at DESC'; // 変更
    connection.query(sql,(error,results)=>{
      res.render('d_search.ejs',{items:results})
    //   console.log(results)
    console.log('get検索結果表示')
    });
})

module.exports = router;
