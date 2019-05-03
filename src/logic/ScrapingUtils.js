'use strict'

// Webpackの問題もあるので、importではなくrequireで読み込む
const client = require('cheerio-httpcli')
import Moji from 'moji'

import Constants from '../Constants.js'
import FileUtils from './FileUtils.js'

export default class ScrapingUtils {

    // テスト時は次のURLを使用すること（昨年のミュー杯の成績が掲載されているQMA Japan Tour公式サイト）
    // https://p.eagate.573.jp/game/qma/14/p/qt/log.html?t=QT03395258

    static importLatestScore () {
        return FileUtils.loadJsonFile(Constants.SETTING_FILE_NAME).then((data) => {
            if (data.scoreUrl == undefined || data.scoreUrl == '') {
                return Promise.reject('Score URL is NOT definied.')
            } else {
                return Promise.resolve(data.scoreUrl)
            }
        }).then((url) => {
            return new Promise((resolve, reject) => {
                client.fetch(url, 'sjis', function(err, $, res) {
                    if (err) {
                        reject(`Scraping failed. reason: ${err}`)
                    }
                    if (res.statusCode != 200) {
                        reject(`Scraping failed. Code: ${res.statusCode}`)
                    }

                    // 一番上のtableが最新の成績
                    const latestLog = $("table[class='log']")[0]
                    let dataArray = []
                    // forループはタイトル行を飛ばして取得
                    for (let i = 2; i <= 5; i++) {
                        let player = latestLog.children[i]
                        let scoreData = {
                            cardName: player.children[0].children[0].data,
                            genre: Moji(player.children[2].children[0].data).convert('HK', 'ZK').toString(),
                            style: Moji(player.children[3].children[0].data).convert('HK', 'ZK').toString(),
                            difficulty: player.children[4].children[0].data,
                            score:  parseFloat(player.children[5].children[0].data)
                        }
                        dataArray.push(scoreData)
                    }
                    resolve(dataArray)
                })
            })
        })
    }
}