const express = require('express');
const connection = require('./mysqlConnection');//外部ファイルにてdb接続を定義している。それを読み取り。
const port = 3002
const path = require('path')
const moment = require('moment');//日付取得用パッケージ読み込み
var session = require('express-session'); //セッションを使用する為の記述
var setUser = require('./setUser'); //セッションを使用する為に必要なsetUser.jsの読み取り

const app = express()


connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
  });



/////////////////////////////
//////////useの定義//////////////////////////////////

//publicフォルダ内のcssや画像フォルダの読み取りを可能にする
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: false}));//formからpostされた内容を取得可能にする（定型文）CRUDで使う部分

app.use(session({//セッションの為の記述
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

/////////////////////////////
//////////ルーティング定義//////////////////////////////////

//routeフォルダにルーティングを設定
var shopsRouter = require('./routes/shops');
var shopRouter = require('./routes/shop');
var mypageRouter = require('./routes/mypage');
var myprofileRouter = require('./routes/myprofile');
var myprofileEditRouter = require('./routes/myprofileEdit');
var myprofileUpdateRouter = require('./routes/myprofileUpdate');
var myprofile_imgRouter = require('./routes/myprofile_img');
var d_insertRouter = require('./routes/d_insert');
var f_insertRouter = require('./routes/f_insert');
var s_searchRouter = require('./routes/s_search');

//コントローラーを使ってファイルをまとめる実践練習
var mainRouter = require('./routes/main');
app.use('/', setUser, mainRouter);//セッションを使用するページにはルーティングの前にsetUserを読み込ませる




//練習用
var hogeRouter = require('./routes/hoge');
app.use('/hoge', hogeRouter);





app.use('/shops', setUser, shopsRouter);
app.use('/shop', setUser , shopRouter);
app.use('/mypage', mypageRouter);
app.use('/myprofile', myprofileRouter);
app.use('/myprofileEdit', myprofileEditRouter);
app.use('/myprofileUpdate', myprofileUpdateRouter);
app.use('/myprofile_img', myprofile_imgRouter);
app.use('/d_insert', d_insertRouter);
app.use('/f_insert', f_insertRouter);
app.use('/s_search', s_searchRouter);




//3002番ポートを読み込み
app.listen(port, () => console.log(`Example app listening on port ${port}!`))