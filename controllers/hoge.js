

//test という名前で以下のファンクションが使用できるようになる
exports.test = (req, res) => {
    res.render('hoge.ejs',{title:'express'})
  }