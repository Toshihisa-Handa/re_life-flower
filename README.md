#Life-Flowerの本気の制作をするプロジェクト

##githubに最初pushするまでにしたこと

```
$ npm init -y
$ npm install express
```

app.jsにhello world記述しport3002を設定

#サーバー立ち上げコマンド
```
npx nodemon app.js
```

#db名
lf_db

var moment = require('moment');//この記述はmoment.jsを利用するためのもの

#tableplusnのバグについて
PCを再起動させたり、PCの不具合で強制終了したときなど、再起動するとデータベースへの接続ができない時がある
「Access denied for user 'root'@'localhost' 」←このようなエラーが出る

こういったときはターミナルで

```
mysql.server start
mysql -u root
```
などを実行しmysqlサーバーを立ち上げてサイド確認する。
そうするとしばらくすると使えるようにこれまではなった（確証はない）


#iframeの実装の参考にしたサイト
https://olein-design.com/blog/google-map-iframe-for-responsive

＃update文でformタグに「enctype="multipart/form-data"」を入れるとpostが効かなかった（2020/9/10記述）
