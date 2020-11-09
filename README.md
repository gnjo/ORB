# WOO

```
//pug
script(src="https://gnjo.github.io/WOO/WOO.js")
//usage

WOO`
；設定
；
；
＠#000
＠黒＝#000
＠赤＝#300
＠オレンジ＝#ff0
＠グレー＝#123
＠バー＝https://gnjo.github.io/mock3d/bg/bar.jpg
＠王宮＝https://gnjo.github.io/mock3d/bg/castle.jpg
＠シティ１＝https://gnjo.github.io/mock3d/bg/city1.jpg
＠シティ２＝https://gnjo.github.io/mock3d/bg/city2.jpg
＠宿＝https://gnjo.github.io/mock3d/bg/inn.jpg
＠壁画＝https://gnjo.github.io/mock3d/bg/insp1.jpg
＠店＝https://gnjo.github.io/mock3d/bg/shop.jpg
＠＠亜人＝https://gnjo.github.io/mock3d/mons/woman1-min.png
＠サンチック＝https://gnjo.github.io/fatema/santique.otf
＊１００
＃シーン１
＠黒
＄フラグ
＠＠亜人
＠＠
＠グレー
問を始める。

＄問１＝何が本当のところか？｜ライオン｜ホース｜＊メタモル｜シップ｜この中にはない
；回答は＊で示し、それが選択されると＄問１に、兎、がはいる。
＞＃正答｜＄問１
　ダイブすると体はメタモルフォーゼする。処理が割り振られている。
　鋼鉄の機体となる。
　アノニマスシティでもなければ、電子体で闊歩する事は稀だ。
　通信が入る。
＠バー
「貴方の眼となる。チョモランマ」
「オーケー、チョモランマ。ジンクだ」
「武器を確認したい」
「ウィップはスラッシュ、ガンはショットだ」
　登録書には正しく記載されているか。
「問題ない」
「コアの持ち合わせは生憎ない」
「端任務で必要はない」
　通信越しの女は事務的だ。
　サイバーブルーの文書が網膜に送られてくる。
　任務の内容。把握済みだが、目を通せという事だろう。

＠＠
＠赤
；何らかの入力を待つ＊ひとつ以上
＊５００
；１００ミリ秒待つ
＠

；＞＃シーン１
＞＃正答｜＄問１
；文字列は全角スペースか「」で始まる。
＞＃最終行
＃正答
貴方は正しく答えを導き出した。

；

＃最終行
＠赤
＊１０００
`

```

```
let x=WOO`
；設定
；
；
＠#000
＠黒＝#000
＠赤＝#300
＠オレンジ＝#ff0
＠グレー＝#123
＠城＝https://gnjo.github.io/mock3d/bg/city.jpg
＠シティ１＝https://gnjo.github.io/mock3d/bg/city1.jpg
＠＠亜人＝https://gnjo.github.io/mock3d/mons/woman1-min.png

＃シーン１
＠シティ１
＄あああ＝これは設問ですか｜＊あああ｜いいい｜ううう

＞＃せいかい｜＄あああ
＞＃シーン１
＃せいかい
＠＠亜人
「はい、正解」
＞＃終了

＃終了
`

;(async()=>{
 let ans=await x
 console.log(ans)
})();

```





















