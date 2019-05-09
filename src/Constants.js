'use strict'

export default class Constants {

    /**
     * 設定ファイルのファイル名
     */
    static get SETTING_FILE_NAME () {
        return "settings"
    }

    /**
     * ジャンル配列
     */
    static get GENRE () {
        return [
            "ノンジャンル",
            "アニメ＆ゲーム",
            "スポーツ",
            "芸能",
            "ライフスタイル",
            "社会",
            "文系学問",
            "理系学問"
        ]
    }

    /**
     * 出題形式配列（ジャンルセット）
     */
    static get STYLE () {
        return [
            // ===== ノンジャンル
            {"genre": "ノンジャンル", "style": "○×"},
            {"genre": "ノンジャンル", "style": "四択"},
            {"genre": "ノンジャンル", "style": "連想"},
            {"genre": "ノンジャンル", "style": "文字パネル"},
            {"genre": "ノンジャンル", "style": "並べ替え"},
            {"genre": "ノンジャンル", "style": "スロット"},
            {"genre": "ノンジャンル", "style": "タイピング"},
            {"genre": "ノンジャンル", "style": "エフェクト"},
            {"genre": "ノンジャンル", "style": "キューブ"},
            {"genre": "ノンジャンル", "style": "一問多答"},
            {"genre": "ノンジャンル", "style": "線結び"},
            {"genre": "ノンジャンル", "style": "順番当て"},
            {"genre": "ノンジャンル", "style": "グループ分け"},
            {"genre": "ノンジャンル", "style": "ランダム"},
            // ===== アニメ＆ゲーム
            {"genre": "アニメ＆ゲーム", "style": "○×"},
            {"genre": "アニメ＆ゲーム", "style": "四択"},
            {"genre": "アニメ＆ゲーム", "style": "連想"},
            {"genre": "アニメ＆ゲーム", "style": "文字パネル"},
            {"genre": "アニメ＆ゲーム", "style": "並べ替え"},
            {"genre": "アニメ＆ゲーム", "style": "スロット"},
            {"genre": "アニメ＆ゲーム", "style": "タイピング"},
            {"genre": "アニメ＆ゲーム", "style": "エフェクト"},
            {"genre": "アニメ＆ゲーム", "style": "キューブ"},
            {"genre": "アニメ＆ゲーム", "style": "一問多答"},
            {"genre": "アニメ＆ゲーム", "style": "線結び"},
            {"genre": "アニメ＆ゲーム", "style": "順番当て"},
            {"genre": "アニメ＆ゲーム", "style": "グループ分け"},
            {"genre": "アニメ＆ゲーム", "style": "アニメ・特撮"},
            {"genre": "アニメ＆ゲーム", "style": "漫画・ノベル"},
            {"genre": "アニメ＆ゲーム", "style": "ゲーム・おもちゃ"},
            {"genre": "アニメ＆ゲーム", "style": "ランダム"},
            // ===== スポーツ
            {"genre": "スポーツ", "style": "○×"},
            {"genre": "スポーツ", "style": "四択"},
            {"genre": "スポーツ", "style": "連想"},
            {"genre": "スポーツ", "style": "文字パネル"},
            {"genre": "スポーツ", "style": "並べ替え"},
            {"genre": "スポーツ", "style": "スロット"},
            {"genre": "スポーツ", "style": "タイピング"},
            {"genre": "スポーツ", "style": "エフェクト"},
            {"genre": "スポーツ", "style": "キューブ"},
            {"genre": "スポーツ", "style": "一問多答"},
            {"genre": "スポーツ", "style": "線結び"},
            {"genre": "スポーツ", "style": "順番当て"},
            {"genre": "スポーツ", "style": "グループ分け"},
            {"genre": "スポーツ", "style": "野球"},
            {"genre": "スポーツ", "style": "サッカー"},
            {"genre": "スポーツ", "style": "スポーツその他"},
            {"genre": "スポーツ", "style": "ランダム"},
            // ===== 芸能
            {"genre": "芸能", "style": "○×"},
            {"genre": "芸能", "style": "四択"},
            {"genre": "芸能", "style": "連想"},
            {"genre": "芸能", "style": "文字パネル"},
            {"genre": "芸能", "style": "並べ替え"},
            {"genre": "芸能", "style": "スロット"},
            {"genre": "芸能", "style": "タイピング"},
            {"genre": "芸能", "style": "エフェクト"},
            {"genre": "芸能", "style": "キューブ"},
            {"genre": "芸能", "style": "一問多答"},
            {"genre": "芸能", "style": "線結び"},
            {"genre": "芸能", "style": "順番当て"},
            {"genre": "芸能", "style": "グループ分け"},
            {"genre": "芸能", "style": "テレビ・映画"},
            {"genre": "芸能", "style": "音楽"},
            {"genre": "芸能", "style": "芸能その他"},
            {"genre": "芸能", "style": "ランダム"},
            // ===== ライフスタイル
            {"genre": "ライフスタイル", "style": "○×"},
            {"genre": "ライフスタイル", "style": "四択"},
            {"genre": "ライフスタイル", "style": "連想"},
            {"genre": "ライフスタイル", "style": "文字パネル"},
            {"genre": "ライフスタイル", "style": "並べ替え"},
            {"genre": "ライフスタイル", "style": "スロット"},
            {"genre": "ライフスタイル", "style": "タイピング"},
            {"genre": "ライフスタイル", "style": "エフェクト"},
            {"genre": "ライフスタイル", "style": "キューブ"},
            {"genre": "ライフスタイル", "style": "一問多答"},
            {"genre": "ライフスタイル", "style": "線結び"},
            {"genre": "ライフスタイル", "style": "順番当て"},
            {"genre": "ライフスタイル", "style": "グループ分け"},
            {"genre": "ライフスタイル", "style": "グルメ・生活"},
            {"genre": "ライフスタイル", "style": "ホビー"},
            {"genre": "ライフスタイル", "style": "ライフスタイルその他"},
            {"genre": "ライフスタイル", "style": "ランダム"},
            // ===== 社会
            {"genre": "社会", "style": "○×"},
            {"genre": "社会", "style": "四択"},
            {"genre": "社会", "style": "連想"},
            {"genre": "社会", "style": "文字パネル"},
            {"genre": "社会", "style": "並べ替え"},
            {"genre": "社会", "style": "スロット"},
            {"genre": "社会", "style": "タイピング"},
            {"genre": "社会", "style": "エフェクト"},
            {"genre": "社会", "style": "キューブ"},
            {"genre": "社会", "style": "一問多答"},
            {"genre": "社会", "style": "線結び"},
            {"genre": "社会", "style": "順番当て"},
            {"genre": "社会", "style": "グループ分け"},
            {"genre": "社会", "style": "地理"},
            {"genre": "社会", "style": "政治・経済"},
            {"genre": "社会", "style": "社会その他"},
            {"genre": "社会", "style": "ランダム"},
            // ===== 文系学問
            {"genre": "文系学問", "style": "○×"},
            {"genre": "文系学問", "style": "四択"},
            {"genre": "文系学問", "style": "連想"},
            {"genre": "文系学問", "style": "文字パネル"},
            {"genre": "文系学問", "style": "並べ替え"},
            {"genre": "文系学問", "style": "スロット"},
            {"genre": "文系学問", "style": "タイピング"},
            {"genre": "文系学問", "style": "エフェクト"},
            {"genre": "文系学問", "style": "キューブ"},
            {"genre": "文系学問", "style": "一問多答"},
            {"genre": "文系学問", "style": "線結び"},
            {"genre": "文系学問", "style": "順番当て"},
            {"genre": "文系学問", "style": "グループ分け"},
            {"genre": "文系学問", "style": "歴史"},
            {"genre": "文系学問", "style": "美術・文学"},
            {"genre": "文系学問", "style": "文系学問その他"},
            {"genre": "文系学問", "style": "ランダム"},
            // ===== 理系学問
            {"genre": "理系学問", "style": "○×"},
            {"genre": "理系学問", "style": "四択"},
            {"genre": "理系学問", "style": "連想"},
            {"genre": "理系学問", "style": "文字パネル"},
            {"genre": "理系学問", "style": "並べ替え"},
            {"genre": "理系学問", "style": "スロット"},
            {"genre": "理系学問", "style": "タイピング"},
            {"genre": "理系学問", "style": "エフェクト"},
            {"genre": "理系学問", "style": "キューブ"},
            {"genre": "理系学問", "style": "一問多答"},
            {"genre": "理系学問", "style": "線結び"},
            {"genre": "理系学問", "style": "順番当て"},
            {"genre": "理系学問", "style": "グループ分け"},
            {"genre": "理系学問", "style": "物理・化学"},
            {"genre": "理系学問", "style": "生物"},
            {"genre": "理系学問", "style": "理系学問その他"},
            {"genre": "理系学問", "style": "ランダム"}
        ]
    }

    /**
     * 難易度配列
     */
    static get DIFFICULTY () {
        return [
            "EASY",
            "NORMAL",
            "HARD"
        ]
    }
}