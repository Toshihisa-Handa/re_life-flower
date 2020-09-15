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
var topRouter = require('./routes/top');
var shopsRouter = require('./routes/shops');
var shopRouter = require('./routes/shop');
var fregeRouter = require('./routes/frege');
var flowersRouter = require('./routes/flowers');
var flowerRouter = require('./routes/flower');
var flowerDeleteRouter = require('./routes/flowerDelete');
var flowerEditRouter = require('./routes/flowerEdit');
var flowerUpdateRouter = require('./routes/flowerUpdate');
var dregeRouter = require('./routes/drege');
var diarysRouter = require('./routes/diarys');
var diaryRouter = require('./routes/diary');
var d_searchRouter = require('./routes/d_search.js');
var diaryDeleteRouter = require('./routes/diaryDelete');
var diaryEditRouter = require('./routes/diaryEdit');
var diaryUpdateRouter = require('./routes/diaryUpdate');
var mypageRouter = require('./routes/mypage');
var myprofileRouter = require('./routes/myprofile');
var myprofileEditRouter = require('./routes/myprofileEdit');
var myprofileUpdateRouter = require('./routes/myprofileUpdate');
var myprofile_imgRouter = require('./routes/myprofile_img');
var myprofile_img2Router = require('./routes/myprofile_img2');
var myprofile_img3Router = require('./routes/myprofile_img3');
var myprofile_img4Router = require('./routes/myprofile_img4');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var d_insertRouter = require('./routes/d_insert');
var f_insertRouter = require('./routes/f_insert');
var s_searchRouter = require('./routes/s_search');
var d_searchRouter = require('./routes/d_search');
var f_searchRouter = require('./routes/f_search');







app.use('/', setUser, topRouter);//セッションを使用するページにはルーティングの前にsetUserを読み込ませる
app.use('/shops', setUser, shopsRouter);
app.use('/shop', shopRouter);
app.use('/frege', setUser, fregeRouter);//セッションを使用するページにはルーティングの前にsetUserを読み込ませる
app.use('/flowers', flowersRouter);
app.use('/flower', flowerRouter);
app.use('/flowerDelete/', flowerDeleteRouter);
app.use('/flowerEdit/', flowerEditRouter);
app.use('/flowerUpdate/', flowerUpdateRouter);
app.use('/drege', setUser, dregeRouter);//セッションを使用するページにはルーティングの前にsetUserを読み込ませる
app.use('/diarys',setUser, diarysRouter);
app.use('/diary', diaryRouter);
app.use('/d_search', d_searchRouter);
app.use('/diaryDelete/', diaryDeleteRouter);
app.use('/diaryEdit/', diaryEditRouter);
app.use('/diaryUpdate/', diaryUpdateRouter);
app.use('/mypage', mypageRouter);
app.use('/myprofile', myprofileRouter);
app.use('/myprofileEdit', myprofileEditRouter);
app.use('/myprofileUpdate', myprofileUpdateRouter);
app.use('/myprofile_img', myprofile_imgRouter);
app.use('/myprofile_img2', myprofile_img2Router);
app.use('/myprofile_img3', myprofile_img3Router);
app.use('/myprofile_img4', myprofile_img4Router);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/d_insert', d_insertRouter);
app.use('/f_insert', f_insertRouter);
app.use('/s_search', s_searchRouter);
app.use('/d_search', d_searchRouter);
app.use('/f_search', f_searchRouter);




//3002番ポートを読み込み
app.listen(port, () => console.log(`Example app listening on port ${port}!`))