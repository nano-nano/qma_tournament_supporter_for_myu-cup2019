# qma_tournament_supporter_for_myu-cup2019

QMA店舗大会支援システム for MYUCUP VIvid poetry


## これはなに？

クイズマジックアカデミーシリーズ(QMA)の店舗大会にて、組み合わせ表示等を行うための大会運営支援システムです。

2019年6月15日に上尾ミナミボウルにて開催される「MYUCUP VIvid poetry」用にカスタマイズされています。


## 機能

- エントリーデータのインポート（Excelファイル）、編集
- 成績管理画面の表示、組み合わせ抽選
- 組み合わせ抽選結果の投影
- QMA公式サイトからの成績自動インポート
- 組み合わせ、試合結果のTwitter連携


## 操作方法

準備中...



## ライセンス

プログラム本体については [MIT License](https://github.com/tcnksm/tool/blob/master/LICENCE) です。


## 作者

Nano-Nano
[@nano2_aloerina](https://twitter.com/nano2_aloerina)


## 開発者向け情報

### 開発環境

```
$ node --version
v10.15.3

$ npm --version
6.4.1

$ vue --version
3.6.3

$ yarn --version
1.15.2
```

### プロジェクトセットアップ

```
$ git clone https://github.com/nano-nano/qma_tournament_supporter_for_myu-cup2019.git
$ yarn install
```

### 開発モードで起動

```
$ yarn electron:serve
```

### リリース用ビルド実施

```
$ yarn electron:build
```

### Webスクレイピングのための手動修正

Webスクレイピングに利用する```cheerio-httpcli```ライブラリが利用している```iconv-lite```ライブラリがWebpackでのパッケージングに際し問題を起こしてしまうため、
```qma_tournament_supporter_for_myu-cup2019\node_modules\iconv-lite\lib\index.js```の次の２行を手動で修正する必要があります。

```
require("./streams")(iconv);
↓
require("./streams.js")(iconv); 

require("./extend-node")(iconv);
↓
require("./extend-node.js")(iconv);
```

詳細は https://github.com/ashtuchkin/iconv-lite/issues/204 を参照してください。