'use strict'

import FileUtils from './FileUtils.js'

export default class ScoreUtils {

    static calcScoreAndDefRate (playersDataArray, nWin) {
        // 成績順にソート
        playersDataArray.sort((a, b) => {
            if(parseFloat(a.score) > parseFloat(b.score)) return -1
            if(parseFloat(a.score) < parseFloat(b.score)) return 1
            return 0
        })
        // 最大素点を取得
        const maxScore = Math.max.apply(null, playersDataArray.map(function(o){return o.score}))

        let i = 1
        for (let playerData of playersDataArray) {
            playerData.rank = i
            playerData.defRate = parseFloat(playerData.score) / parseFloat(maxScore)
            if (i <= nWin) {
                playerData.isWin = true
            } else {
                playerData.isWin = false
            }
            i++
        }
    }

    static updateScore (extractedPlayersData, targetRoundName) {
        return FileUtils.loadAllPlayersData().then((loadData) => {
            for (const playerData of extractedPlayersData) {
              let orgData = loadData.find((e) => {
                return e.entryNo == playerData.entryNo
              })
              if (orgData != undefined) {
                // データがある場合に更新
                orgData.roundDatas[targetRoundName].genre = playerData.genre
                orgData.roundDatas[targetRoundName].style = playerData.style
                orgData.roundDatas[targetRoundName].difficulty = playerData.difficulty
                orgData.roundDatas[targetRoundName].score = parseFloat(playerData.score)
                orgData.roundDatas[targetRoundName].rank = parseInt(playerData.rank)
                orgData.roundDatas[targetRoundName].defRate = parseFloat(playerData.defRate)
                orgData.roundDatas[targetRoundName].isWin = playerData.isWin
              }
            }
            return loadData
        })
    }

    /**
     * 表示用に指定した桁数で四捨五入します
     * 
     * @param {Number} number 四捨五入する対象の値
     * @param {Number} precision 小数点以下の桁数（負の数を指定するとnの位）
     */
    static roundForShow(number, precision) {
        let shift = function (number, precision, reverseShift) {
            if (reverseShift) {
                precision = -precision;
            }  
            let numArray = ("" + number).split("e");
            return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
        };
        return shift(Math.round(shift(number, precision, false)), precision, true);
    }
}