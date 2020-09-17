var express = require('express');
var router = express.Router();
let main_c = require('../controllers/main')//コントローラーフォルダのmainファイルを読み取る
let diary_c = require('../controllers/diary')//コントローラーフォルダのdiaryファイルを読み取る
let flower_c = require('../controllers/flower')//コントローラーフォルダのflowerファイルを読み取る
let shop_c = require('../controllers/shop')//コントローラーフォルダのshopファイルを読み取る

//mainカテゴリのルーティング＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
router.get('/',main_c.top);//top  トップ画面表示
router.get('/login',main_c.login );//login  店舗ログイン画面表示
router.post('/login', main_c.login_post);//login  店舗ログイン機能
router.get('/logout',main_c.logout);//logout  ログアウト機能
router.get('/register',main_c.register);//register  店舗新規登録画面表示
router.post('/register',main_c.register_post);//register  店舗新規登録機能

//mainここまで========================================================
//diaryカテゴリのルーティング＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
router.get('/d_search', diary_c.d_search);//d_search  日記検索機能
router.get('/diary/:id',diary_c.diary);//diary  日記詳細表示
router.get('/diaryDelete/:id',diary_c.diaryDelete);//diaryDelete  日記削除機能
router.get('/diaryEdit/:id',diary_c.diaryEdit);//diaryEdit  日記編集画面表示
router.get('/diarys', diary_c.diarys);//diarys  日記一覧表示
router.post('/diaryUpdate/:id',diary_c.diaryUpdate);//diaryUpdate  日記編集機能
router.get('/drege',diary_c.drege);//drege  日記投稿画面表示

//diaryここまで========================================================
//flowerカテゴリのルーティング＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
router.get('/f_search',flower_c.f_search);//f_search  お花検索機能
router.get('/flower/:id',flower_c.flower)//flower  お花詳細表示
router.get('/flowerDelete/:id',flower_c.flowerDelete)//flowerDelete  お花削除機能
router.get('/flowerEdit/:id',flower_c.flowerEdit)//flowerEdit  お花編集画面表示
router.get('/flowers',flower_c.flowers);//flowers  お花一覧画面表示
router.post('/flowerUpdate/:id',flower_c.flowerUpdate);//flowerUpdate  お花編集機能
router.get('/frege', flower_c.frege);//frege  お花投稿画面表示

//flowerここまで========================================================
//shopカテゴリのルーティング＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
router.get('/mypage', shop_c.mypage);//mypage  店舗マイページ画面表示
router.get('/myprofile', shop_c.myprofile);//myprofile  店舗詳細画面表示
router.get('/myprofileEdit/:id',shop_c.myprofileEdit);//myprofileEdit  店舗情報編集画面表示
router.post('/myprofileUpdate/:id', shop_c.myprofileUpdate);//myprofileUpdate  店舗情報編集機能
router.get('/s_search',shop_c.s_search);//s_search  店舗検索機能
router.get('/shop/:id', shop_c.shop)//shop  店舗投稿詳細表示
router.get('/shops',shop_c.shops );//shops  店舗一覧画面表示










//shopここまで========================================================










module.exports = router;
