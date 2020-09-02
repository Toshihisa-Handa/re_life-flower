//npmでインストールしたmysqlが使えるようになります
const mysql = require('mysql');

//db接続の定義
const dbConfig ={
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lf_db'
};

//データベースの情報をオブジェクトにして引数に渡し、その返り値をconnectionという変数に代入
const connection = mysql.createConnection(dbConfig);
// これは
// //DBの接続準備
// const connection =
//    mysql.createConnection({
//       host:'localhost',
//       user:'root',//mampではroot
//       password:'',//mampでは空でOK
//       database:'node_test_db'//任意のDB名
//    });
// と同じ


//外部からrequireできる形にします
module.exports = connection;