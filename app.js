const express = require('express');
const connection = require('./mysqlConnection');//外部ファイルにてdb接続を定義している。それを読み取り。
const app = express()
const port = 3002


connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
  });



app.get('/',(req, res)=>{
    res.render('top.ejs')
})

app.get('/shops',(req, res)=>{
    res.render('shops.ejs')
})
app.get('/shopDetail',(req, res)=>{
    res.render('shopDetail.ejs')
})

app.get('/flowers',(req, res)=>{
    res.render('flowers.ejs')
})

app.get('/flowerDetail',(req, res)=>{
    res.render('flowerDetail.ejs')
})

app.get('/diary',(req, res)=>{
    res.render('diary.ejs')
})

app.get('/diaryDetail',(req, res)=>{
    res.render('diaryDetail.ejs')
})

app.get('/mypage',(req, res)=>{
    res.render('mypage.ejs')
})
app.get('/register',(req, res)=>{
    res.render('register.ejs')
})
app.get('/login',(req, res)=>{
    res.render('login.ejs')
})










//3002番ポートを読み込み
app.listen(port, () => console.log(`Example app listening on port ${port}!`))