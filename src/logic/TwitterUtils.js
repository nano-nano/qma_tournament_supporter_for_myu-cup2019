'use strict'

import FileUtils from './FileUtils.js'

/** 設定ファイル名 */
const CONFIG_FILE = 'twitter'

/** ツイートprefix */
const TWEET_COMMON_PREFIX = "【2019/6/15 MYUCUP VIvid poetry 大会速報】\n"
/** ツイートsuffix */
const TWEET_COMMON_SUFFIX = "\n#QMA #MYUCUP #MYUCUP2019"

const TWEET_CONTENT = [
    // 1回戦
    {id: 101, round: 'R1', description: '１回戦組み合わせ（全試合）',
        twiMsg: TWEET_COMMON_PREFIX + '１回戦組み合わせ（全試合）' + TWEET_COMMON_SUFFIX},
    {id: 102, round: 'R1', description: '１回戦試合結果（全試合）',
        twiMsg: TWEET_COMMON_PREFIX + '１回戦試合結果（全試合）' + TWEET_COMMON_SUFFIX},
]

export default class TwitterUtils {

    static startAuthRequest () {
        const OauthTwitter = require('electron').remote.require('electron-oauth-twitter')

        return new Promise((resolve, reject) => {
            if (!FileUtils.isJsonFileExist(CONFIG_FILE)) {
                reject('設定ファイル（twitter.json）がありません')
            }
            resolve()
        }).then(() => FileUtils.loadJsonFile(CONFIG_FILE)).then((data) => {
            if (data.consumerKey == null || data.consumerKey == ''
                    || data.consumerSecret == null || data.consumerSecret == '') {
                return Promise.reject('ConsumerKey, ConsumerSecretが設定されていません')
            }
            const twitter = new OauthTwitter({
                key: data.consumerKey,
                secret: data.consumerSecret,
            })
            return twitter.startRequest().then((result) => {
                data.accessToken = result.oauth_access_token
                data.accessTokenSecret = result.oauth_access_token_secret
                return FileUtils.saveJsonFile(CONFIG_FILE, data)
            })
        })
    }

    static getTweetSelection (roundName) {
        return TWEET_CONTENT.filter((e) => { return e.round == roundName })
                .map((e) => { return {id: e.id, description: e.description} })
    }

    static postTweet (tweetId) {
        // ツイート本文を抽出
        TWEET_CONTENT.find((e) => { return e.id == tweetId })

        // キャプチャ画像生成
        // 画像アップロード
        // 画像を添付してツイート
    }

    static captureScreen () {
        
    }
}