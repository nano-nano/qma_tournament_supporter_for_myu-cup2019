<template>
  <div class="round2-screen">
    <b-container fluid>
      <!-- 制御エリア -->
      <b-row align-h="between">
        <b-col cols="3">
          <b-button variant="outline-primary" block @click="projection()">投影画面に投影</b-button>
        </b-col>
        <b-col cols="4">
          <b-row>
            <b-col cols="6">
              <b-button variant="outline-primary" :pressed.sync="isAutoImportRunning" block>成績自動追尾</b-button>
            </b-col>
            <b-col cols="6">
              <b-button variant="outline-primary" block @click="openTwitterFlashDialog()">Twitter速報</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <hr>

      <!-- 組み合わせデータテーブル -->
      <b-row style="height: 62.5vh; overflow:auto;">
        <b-col>
          <table class="table table-condensed table-hover table-bordered">
            <thead>
              <tr>
                <th width="7.25%">試合ID</th>
                <th width="5%">Entry</th>
                <th width="12.5%">カードネーム</th>
                <th width="12.5%">ジャンル</th>
                <th width="15.25%">形式</th>
                <th width="10%">難易度</th>
                <th width="8.75%">素点</th>
                <th width="5%">順位</th>
                <th width="8.75%">惜敗率</th>
                <th width="5%">勝抜</th>
                <th width="10%"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(playerData, idx) of extractedPlayersData" :key="idx">
                <td style="text-align: center; vertical-align: middle;" :class="computeTableClass(playerData.entryNo == 999, playerData.setNo % 2 == 0)">
                  {{playerData.setNo}} - {{playerData.seatNo}}
                </td>
                <td style="text-align: center; vertical-align: middle;" :class="computeTableClass(playerData.entryNo == 999, playerData.setNo % 2 == 0)">
                  {{playerData.entryNo}}
                </td>
                <td style="text-align: center; vertical-align: middle; font-size:90%" :class="computeTableClass(playerData.entryNo == 999, playerData.setNo % 2 == 0)">
                  {{playerData.isSubCard ? '★' : ''}}{{playerData.cardName}}
                </td>
                <td style="text-align: center; vertical-align: middle;" :class="computeTableClass(playerData.entryNo == 999, playerData.setNo % 2 == 0)">
                  <b-form-select v-model="playerData.genre" :options="GENRE" style="font-size:75%"></b-form-select>
                </td>
                <td style="text-align: center; vertical-align: middle;" :class="computeTableClass(playerData.entryNo == 999, playerData.setNo % 2 == 0)">
                  <b-form-select v-model="playerData.style" :options="STYLE.filter((e) => {return e.genre == playerData.genre}).map((e2) => e2.style)" style="font-size:75%"></b-form-select>
                </td>
                <td style="text-align: center; vertical-align: middle;" :class="computeTableClass(playerData.entryNo == 999, playerData.setNo % 2 == 0)">
                  <b-form-select v-model="playerData.difficulty" :options="DIFFICULTY" style="font-size:75%"></b-form-select>
                </td>
                <td style="text-align: center; vertical-align: middle;" :class="computeTableClass(playerData.entryNo == 999, playerData.setNo % 2 == 0)">
                  <b-form-input v-model="playerData.score" :state="validScore(playerData.score)" :disabled="playerData.entryNo == 999"></b-form-input>
                </td>
                <td style="text-align: center; vertical-align: middle;" :class="computeTableClass(playerData.entryNo == 999, playerData.setNo % 2 == 0)">
                  {{playerData.rank}}
                </td>
                <td style="text-align: right; vertical-align: middle;" :class="computeTableClass(playerData.entryNo == 999, playerData.setNo % 2 == 0)">
                  {{formatDefRate(playerData.defRate)}} %
                </td>
                <td style="text-align: center; vertical-align: middle;" :class="computeTableClass(playerData.entryNo == 999, playerData.setNo % 2 == 0)">
                  <b-form-checkbox v-model="playerData.isWin" :disabled="playerData.entryNo == 999"></b-form-checkbox>
                </td>
                <td :class="idx % 4 == 3 ? 'wo-top-border' : 'wo-top-bottom-border'">
                  <b-button variant="outline-primary" v-if="idx % 4 == 0" block @click="importScore()" :disabled="isScoreImporting">再取込</b-button>
                  <b-button variant="outline-primary" v-if="idx % 4 == 1" block @click="calcScore(playerData.setNo)">再計算</b-button>
                  <b-button variant="outline-primary" v-if="idx % 4 == 2" block @click="saveScore(playerData.setNo, true)">保存</b-button>
                  <b-button variant="outline-primary" v-if="idx % 4 == 3" block :pressed.sync="isCloseUpShown" @click="showCloseUpDialog(playerData.setNo)">拡大表示</b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>
      <hr>

      <b-row align-h="end">
        <b-col cols="3">
          <b-button variant="outline-primary" block @click="drawingForNextRound()">2回戦終了</b-button>
        </b-col>
      </b-row>

    </b-container>

    <!-- ダイアログ -->
    <notification-dialog ref="saveNotificationDialog" message="保存しました！"></notification-dialog>
    <notification-dialog ref="finishNotificationDialog" message="準決勝戦の抽選を実施し、保存しました！"></notification-dialog>
    <twitter-select-dialog ref="twitterSelectDialog" roundName="R2"
      v-on:onSuccessTweet="onTweetSucceeded()" v-on:onFailTweet="onTweetFailed()"></twitter-select-dialog>
    <notification-dialog ref="successTweetNotificationDialog" message="速報ツイートに成功しました！"></notification-dialog>
    <error-dialog ref="tweetErrorDialog" message="速報ツイートに失敗しました"></error-dialog>
  </div>
</template>

<script>
import { setInterval, clearInterval } from 'timers'

import Constants from '../Constants.js'
import CommonUtils from '../logic/CommonUtils.js'
import FileUtils from '../logic/FileUtils.js'
import PlayerUtils from '../logic/PlayerUtils.js'
import ScoreUtils from '../logic/ScoreUtils.js'
import ScrapingUtils from '../logic/ScrapingUtils.js'
import TwitterUtils from '../logic/TwitterUtils.js'

import NotificationDialog from './common/NotificationDialog'
import ErrorDialog from './common/ErrorDialog'
import TwitterSelectDialog from './common/TwitterSelectDialog'

export default {
  name: 'Round1Screen',
  components: {
    NotificationDialog,
    ErrorDialog,
    TwitterSelectDialog,
  },
  data () {
    return {
      extractedPlayersData: [],
      isAutoImportRunning: false,
      isScoreImporting: false,
      isCloseUpShown: false,
      fetchTimer: null,
      GENRE: Constants.GENRE,
      STYLE: Constants.STYLE,
      DIFFICULTY: Constants.DIFFICULTY
    }
  },
  methods: {
    projection () {
      this.$store.commit('updateProjectionScreen', this.$router.resolve('round2projection').href)
    },
    openTwitterFlashDialog () {
      this.$refs['twitterSelectDialog'].show()
    },
    loadRoundPlayersData () {
      FileUtils.loadAllPlayersData().then((loadData) => {
        if (loadData == null) return

        const nPlayers = loadData.filter((e) => { return e.roundDatas['R2'] != undefined }).length
        for (let set = 1; set <= (Math.ceil(nPlayers / 4)); set++) {
          for (let seat = 1; seat <= 4; seat++) {
            const extracted = PlayerUtils.extractPlayerDataBySetSeatNo(loadData, 'R2', set, seat)
            const roundData = extracted.roundDatas['R2']
            this.extractedPlayersData.push({
                entryNo: extracted.entryNo,
                cardName: extracted.cardName,
                isSubCard: extracted.isSubCard,
                setNo: roundData.setNo,
                seatNo: roundData.seatNo,
                genre: roundData.genre,
                style: roundData.style,
                difficulty: roundData.difficulty,
                score: roundData.score,
                rank: roundData.rank,
                defRate: roundData.defRate,
                isWin: roundData.isWin,
                isDefWin: roundData.isDefWin,
            })
          }
        }
      })
    },
    importScore () {
      this.isScoreImporting = true
      ScrapingUtils.importLatestScore().then((importedDataArray) => {
        // 結果をUIに反映
        let targetSetNo = 0
        for (let importedData of importedDataArray) {
            for (let parentData of this.extractedPlayersData) {
                if (parentData.cardName == importedData.cardName) {
                    // データを設定
                    parentData.genre = importedData.genre
                    parentData.style = importedData.style
                    parentData.difficulty = importedData.difficulty
                    parentData.score = importedData.score
                    targetSetNo = parentData.roundDatas['R2'].setNo
                    break
                }
            }
        }
        this.isScoreImporting = false

        // 結果をUIに反映できていない場合は処理中止
        if (targetSetNo == 0) return
        // 取り込んだ結果を再計算
        this.calcScore(targetSetNo)

        // 処理結果をtoastで表示
        this.$bvToast.toast('最新の成績を取り込みました', {
          title: 'QMA Tournament Supporter',
          solid: true,
          autoHideDelay: 5000,
        })
      }).catch(() => {
        this.isScoreImporting = false
        // 処理結果をtoastで表示
        this.$bvToast.toast('成績取り込みに失敗しました', {
          title: 'QMA Tournament Supporter',
          solid: true,
          variant: 'danger',
          autoHideDelay: 5000,
        })
      })
    },
    calcScore (setNo) {
      let targetPlayersData = this.extractedPlayersData.filter((e) => {
        return e.setNo == setNo
      })
      ScoreUtils.calcScoreAndDefRate(targetPlayersData, 2)
      this.saveScore(setNo, false)
      this.updateProjectionScreen()
    },
    saveScore (setNo, isNeedDialog) {
      let targetPlayersData = this.extractedPlayersData.filter((e) => {
        return e.setNo == setNo
      })
      ScoreUtils.updateScore(targetPlayersData, 'R2').then((updatedData) => {
        return FileUtils.saveAllPlayersData(updatedData)
      }).then(() => {
        if (isNeedDialog) this.$refs['saveNotificationDialog'].show()
        this.updateProjectionScreen()
      })
    },
    showCloseUpDialog (setNo) {
      this.$store.commit('sendMsgToProjectionScreen', {channel: 'close-up', args: {setNo: setNo}})
    },
    drawingForNextRound () {
      ScoreUtils.updateScore(this.extractedPlayersData, 'R2').then((updatedData) => {
        // 現時点での成績を保存する
        return FileUtils.saveAllPlayersData(updatedData)
      }).then(() => {
        // 再度読み込む
        return FileUtils.loadAllPlayersData()
      }).then((loadData) => {
        // 勝ち抜けたプレイヤーのEntryNoを抽出する
        let targetPlayersEntryNo = loadData.filter((e) => { return (e.roundDatas['R2'] != undefined && e.roundDatas['R2'].isWin == true) })
          .map((e) => { return e.entryNo })
        // シャッフルする
        CommonUtils.shuffleArray(targetPlayersEntryNo)

        let setNo = 1
        let seatNo = 1
        for (let entryNo of targetPlayersEntryNo) {
          // 準決勝のデータを生成
          const sf = PlayerUtils.createEmptyRoundData()
          sf.setNo = setNo
          sf.seatNo = seatNo
          // 親の配列に設定
          loadData.find((e) => { return e.entryNo == entryNo }).roundDatas['SF'] = sf

          // 座席No.をインクリメント
          seatNo++
          if (seatNo == 5) {
            // 試合No.をインクリメントして、座席No.をリセット
            setNo++
            seatNo = 1
          }
        }

        return loadData
      }).then((updatedData) => {
        return FileUtils.saveAllPlayersData(updatedData)
      }).then(() => {
        this.$refs['finishNotificationDialog'].show()
      })
    },
    updateProjectionScreen () {
      this.$store.commit('sendMsgToProjectionScreen', {channel: 'update', args: null})
    },
    onTweetSucceeded () {
      this.$refs['successTweetNotificationDialog'].show()
    },
    onTweetFailed () {
      this.$refs['tweetErrorDialog'].show()
    },
    formatDefRate (defRate) {
      return ScoreUtils.roundForShow(defRate * 100, 3)
    },
    validScore (score) {
      return (0 <= score && score <= 400) ? null : false
    },
    computeTableClass (isDummy, isEvenSet) {
      if (isDummy) {
        return 'table-secondary'
      } else {
        if (isEvenSet) {
          return 'table-info'
        } else {
          return ''
        }
      }
    }
  },
  mounted: function () {
    this.$store.commit('updateCurrentScreen', 'round2')
    this.loadRoundPlayersData()
  },
  watch: {
    isAutoImportRunning: function (newVal) {
      if (newVal) {
        // 自動追尾停止 -> 自動追尾実行
        FileUtils.loadJsonFile(Constants.SETTING_FILE_NAME).then((data) => {
          const intervalSec = (data.importIntervalSec != undefined) ? data.importIntervalSec : 45
          this.fetchTimer = setInterval(() => this.importScore(), intervalSec * 1000)
        })
      } else {
        // 自動追尾実行 -> 自動追尾停止
        if (this.fetchTimer != null) {
          clearInterval(this.fetchTimer)
          this.fetchTimer = null
        }
      }
    }
  },
  beforeDestroy: function () {
    // 成績自動追尾タイマーを強制停止する
    if (this.fetchTimer != null) {
      clearInterval(this.fetchTimer)
      this.fetchTimer = null
    }
  }
}
</script>

<style scoped>
div.container-fluid {
  margin-top: 100px;
  margin-bottom: 25px;
}

/* テーブルの枠線 */
td.wo-top-bottom-border {
  border-top-style: none;
  border-bottom-style: none;
}
td.wo-top-border {
  border-top-style: none;
}
</style>
