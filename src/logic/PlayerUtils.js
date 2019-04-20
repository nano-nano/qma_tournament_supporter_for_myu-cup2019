'use strict'

export default class PlayerUtils {

    static createPlayerData (entryNo, cardName, isSubCard) {
        return {
            entryNo: entryNo, // エントリーNo.
            cardName: cardName, // カードネーム
            isSubCard: isSubCard, // サブカードフラグ
            roundDatas: {} // ラウンドデータ連想配列
        }
    }

    static createEmptyRoundData () {
        return {
            setNo: 0, // 試合No.
            seatNo: 0, // 座席No.
            genre: "", // 選択ジャンル
            style: "", // 選択出題形式
            difficulty: "", // 選択難易度
            score: 0, // 素点
            rank: 0, // 素順位
            defRate: 0, // 惜敗率
            isWin: false, // 勝ち抜けフラグ
            isDefWin: false // 惜敗勝ち抜けフラグ
        }
    }
}