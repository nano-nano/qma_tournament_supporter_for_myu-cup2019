'use strict'

export default class PlayerUtils {

    /**
     * 新しいプレイヤーデータを生成し返します
     * 
     * @param {Number} entryNo 
     * @param {String} cardName 
     * @param {bool} isSubCard true: サブカードである/ false: サブカードではない
     */
    static createPlayerData (entryNo, cardName, isSubCard) {
        return {
            entryNo: entryNo, // エントリーNo.
            cardName: cardName, // カードネーム
            isSubCard: isSubCard, // サブカードフラグ
            roundDatas: {} // ラウンドデータ連想配列
        }
    }

    /**
     * 新しいラウンドデータを生成し返します
     */
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

    static createDummyPlayer (roundName, setNo, seatNo) {
        let result = this.createPlayerData(999, '（ダミー）', false)
        let roundData = this.createEmptyRoundData()
        roundData.setNo = setNo
        roundData.seatNo = seatNo
        roundData.rank = 99
        result.roundDatas[roundName] = roundData
        return result
    }

    static extractRoundDataByRoundName (playerData, roundName) {
        return playerData.roundDatas[roundName]
    }

    static extractPlayerDataBySetSeatNo (playerDataArray, roundName, setNo, seatNo) {
        const result = playerDataArray.find((e => {
            const roundData = e.roundDatas[roundName]
            return (roundData != null && roundData.setNo == setNo && roundData.seatNo == seatNo)
        }))
        return result == undefined ? null : result
    }
}