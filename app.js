const express = require('express');
const connection = require('./mysqlConnection');//外部ファイルにてdb接続を定義している。それを読み取り。
const app = express()
const port = 3002
const path = require('path')
const moment = require('moment');//日付取得用パッケージ読み込み


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
var mypageRouter = require('./routes/mypage');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var fileupRouter = require('./routes/fileup');

app.use('/', topRouter);
app.use('/shops', shopsRouter);
app.use('/shop', shopRouter);
app.use('/flowers', flowersRouter);
app.use('/flower', flowerRouter);
app.use('/frege', fregeRouter);
app.use('/diarys', diarysRouter);
app.use('/diary', diaryRouter);
app.use('/diaryDelete', diaryDeleteRouter);
app.use('/mypage', mypageRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/fileup', fileupRouter);


//日記編集画面へのルーティング
 app.get('/diaryEdit/:id',(req, res)=>{
   connection.query('SELECT * FROM imgtest WHERE id = ?',[req.params.id],(error,result)=>{
     res.render('diaryEdit.ejs',{item:result[0]});
     console.log(result[0])
   })
 })

 app.post('/diaryUpdate/:id',(req,res)=>{
  var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
	connection.query('UPDATE imgtest SET title = ?, tag = ?, text = ? , created_at = ? WHERE id = ?',[req.body.title, req.body.tag, req.body.text, createdAt, req.params.id],function (error, result) {  
		res.redirect('/frege');
  	});
});


//削除のルーティング
app.get('/diaryDelete/:id',(req,res)=>{
  connection.query('DELETE FROM imgtest WHERE id = ?',[req.params.id],(error,results)=>{
    res.redirect('/frege')
  })
})


//3002番ポートを読み込み
app.listen(port, () => console.log(`Example app listening on port ${port}!`))