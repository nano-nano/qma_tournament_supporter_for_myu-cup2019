'use strict'

// vue-router
import VueRouter from '../router.js'
import Twit from 'twit'

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
        twiMsg: TWEET_COMMON_PREFIX + '１回戦組み合わせ（全試合）' + TWEET_COMMON_SUFFIX,
        screenName: 'round1Capture', screenHeight: 1230},
    {id: 102, round: 'R1', description: '１回戦試合結果（全試合）',
        twiMsg: TWEET_COMMON_PREFIX + '１回戦試合結果（全試合）' + TWEET_COMMON_SUFFIX,
        screenName: 'round1Capture', screenHeight: 1230},
    // 2回戦
    {id: 201, round: 'R2', description: '２回戦組み合わせ（全試合）',
        twiMsg: TWEET_COMMON_PREFIX + '２回戦組み合わせ（全試合）' + TWEET_COMMON_SUFFIX,
        screenName: 'round2Capture', screenHeight: 690},
    {id: 202, round: 'R2', description: '２回戦試合結果（全試合）',
        twiMsg: TWEET_COMMON_PREFIX + '２回戦試合結果（全試合）' + TWEET_COMMON_SUFFIX,
        screenName: 'round2Capture', screenHeight: 690},
    // 準決勝戦
    {id: 301, round: 'SF', description: '準決勝戦組み合わせ（全試合）',
        twiMsg: TWEET_COMMON_PREFIX + '準決勝戦組み合わせ（全試合）' + TWEET_COMMON_SUFFIX,
        screenName: 'semiFinalCapture', screenHeight: 430},
    {id: 302, round: 'SF', description: '準決勝戦試合結果（全試合）',
        twiMsg: TWEET_COMMON_PREFIX + '準決勝戦試合結果（全試合）' + TWEET_COMMON_SUFFIX,
        screenName: 'semiFinalCapture', screenHeight: 430},
    // 決勝戦
    {id: 401, round: 'F', description: '決勝戦組み合わせ（全試合）',
        twiMsg: TWEET_COMMON_PREFIX + '決勝戦組み合わせ（全試合）' + TWEET_COMMON_SUFFIX,
        screenName: 'finalCapture', screenHeight: 300},
    {id: 402, round: 'F', description: '決勝戦試合結果（全試合）',
        twiMsg: TWEET_COMMON_PREFIX + '決勝戦試合結果（全試合）' + TWEET_COMMON_SUFFIX,
        screenName: 'finalCapture', screenHeight: 300},
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
        if (tweetId == null || tweetId == '') { Promise.reject('無効なパラメータです') }
        const content = TWEET_CONTENT.find((e) => { return e.id == tweetId })

        // キャプチャ画像生成
        return this.captureScreen(content).then((picturePath) => {
            // 画像をPOST
            return this.postPicture(FileUtils.loadFileSyncBase64(picturePath))
            // return Promise.resolve()  // デバッグ用（ツイートさせない設定）
        }).then((media) => {
            // テキストをPOST
            return this.postStatus(content, media)
            // return Promise.resolve()  // デバッグ用（ツイートさせない設定）
        })
    }

    static captureScreen (content) {
        return new Promise((resolve, ) => {
            const remote = require('electron').remote
            const BrowserWindow = remote.BrowserWindow
    
            const win = new BrowserWindow({x: 0, y: 2000, enableLargerThanScreen: true })
            win.loadURL(remote.getGlobal('baseUrl') + VueRouter.resolve(content.screenName).href)
            // ウィンドウサイズを大きくするため、表示後にサイズを変える
            win.setContentSize(1200, content.screenHeight)
    
            setTimeout(() => {
                const filePath = process.cwd() + "/screenshot/" + this.getFileNameFromDate() + ".png"
                win.capturePage(function(img) {
                    FileUtils.saveFileSync(filePath, img.toPNG())
                    win.close()
                    resolve(filePath)
                })
            }, 5000)
        })
    }

    static getFileNameFromDate () {
        const date = new Date()
        let format = 'YYYYMMDD-hhmmssSSS'
        format = format.replace(/YYYY/g, date.getFullYear())
        format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
        format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2))
        format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2))
        format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
        format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
        if (format.match(/S/g)) {
          const milliSeconds = ('00' + date.getMilliseconds()).slice(-3)
          const length = format.match(/S/g).length
          for (let i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1))
        }
        return format
    }

    static async postPicture (pictureData) {
        const client = await this.getTwitterClient()
        return client.post('media/upload', {media_data: pictureData})
    }

    static async postStatus (content, media) {
        const status = {
            status: content.twiMsg,
            media_ids: [media.data.media_id_string]
        }
        const client = await this.getTwitterClient()
        return client.post('statuses/update', status)
    }

    static async getTwitterClient () {
        return FileUtils.loadJsonFile(CONFIG_FILE).then((config) => {
            return new Twit({
                consumer_key: config.consumerKey,
                consumer_secret: config.consumerSecret,
                access_token: config.accessToken,
                access_token_secret:config.accessTokenSecret,
              })
        })
    }
}