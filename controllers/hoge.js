

//test という名前で以下のファンクションが使用できるようになる
exports.test = (req, res) => {
    res.render('hoge.ejs',{title:'express'})
  }

exports.submit = (req, res) => {
console.log('email:'+req.body.email) 
 res.redirect('/hoge')

}

exports.pract = (req, res) => {
 res.render('pract.ejs',{text:'hogehoge'})

}