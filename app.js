const express = require('express');
const connection = require('./mysqlConnection');//外部ファイルにてdb接続を定義している。それを読み取り。
const port = 3002
const path = require('path')
const moment = require('moment');//日付取得用パッケージ読み込み
var session = require('express-session'); 
var setUser = require('./setUser'); 

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


/////////////////////////////
//////////ルーティング定義//////////////////////////////////

//routeフォルダにルーティングを設定
var topRouter = require('./routes/top');
var shopsRouter = require('./routes/shops');
var shopRouter = require('./routes/shop');
var flowersRouter = require('./routes/flowers');
var flowerRouter = require('./routes/flower');
var fregeRouter = require('./routes/frege');
var diarysRouter = require('./routes/diarys');
var diaryRouter = require('./routes/diary');
var diaryDeleteRouter = require('./routes/diaryDelete');
var diaryEditRouter = require('./routes/diaryEdit');
var diaryUpdateRouter = require('./routes/diaryUpdate');
var mypageRouter = require('./routes/mypage');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var fileupRouter = require('./routes/fileup');



app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));




app.use('/', setUser, topRouter);
app.use('/shops', shopsRouter);
app.use('/shop', shopRouter);
app.use('/flowers', flowersRouter);
app.use('/flower', flowerRouter);
app.use('/frege', setUser, fregeRouter);
app.use('/diarys', diarysRouter);
app.use('/diary', diaryRouter);
app.use('/diaryDelete/', diaryDeleteRouter);
app.use('/diaryEdit/', diaryEditRouter);
app.use('/diaryUpdate/', diaryUpdateRouter);
app.use('/mypage', mypageRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/fileup', fileupRouter);




//3002番ポートを読み込み
app.listen(port, () => console.log(`Example app listening on port ${port}!`))