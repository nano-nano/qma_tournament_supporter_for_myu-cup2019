<template>
  <div class="round1-screen">
    <b-container fluid>
      <!-- 制御エリア -->
      <b-row align-h="between">
        <b-col cols="3">
          <b-button variant="outline-primary" block disabled>投影画面に投影</b-button>
        </b-col>
        <b-col cols="4">
          <b-row>
            <b-col cols="6">
              <b-button variant="outline-primary" :pressed.sync="isAutoImportRunning" block>成績自動追尾</b-button>
            </b-col>
            <b-col cols="6">
              <b-button variant="outline-primary" block disabled>Twitter速報</b-button>
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
              <tr v-for="(playerData, idx) of extractedPlayersData" :key="idx" :class="playerData.setNo % 2 == 0 ? 'table-info' : ''">
                <td style="text-align: center; vertical-align: middle;">
                  {{playerData.setNo}} - {{playerData.seatNo}}
                </td>
                <td style="text-align: center; vertical-align: middle;">
                  {{playerData.entryNo}}
                </td>
                <td style="text-align: center; vertical-align: middle; font-size:90%">
                  {{playerData.cardName}}
                </td>
                <td style="text-align: center; vertical-align: middle;">
                  <b-form-select v-model="playerData.genre" :options="GENRE" style="font-size:75%"></b-form-select>
                </td>
                <td style="text-align: center; vertical-align: middle;">
                  <b-form-select v-model="playerData.style" :options="STYLE.filter((e) => {return e.genre == playerData.genre}).map((e2) => e2.style)" style="font-size:75%"></b-form-select>
                </td>
                <td style="text-align: center; vertical-align: middle;">
                  <b-form-select v-model="playerData.difficulty" :options="DIFFICULTY" style="font-size:75%"></b-form-select>
                </td>
                <td style="text-align: center; vertical-align: middle;">
                  <b-form-input v-model="playerData.score" :state="validScore(playerData.score)"></b-form-input>
                </td>
                <td style="text-align: center; vertical-align: middle;">
                  {{playerData.rank}}
                </td>
                <td style="text-align: right; vertical-align: middle;">
                  {{formatDefRate(playerData.defRate)}} %
                </td>
                <td style="text-align: center; vertical-align: middle;">
                  <b-form-checkbox v-model="playerData.isWin"></b-form-checkbox>
                </td>
                <td style="border-style: none;">
                  <b-button variant="outline-primary" v-if="idx % 4 == 0" block @click="importScore()" :disabled="isScoreImporting">再取込</b-button>
                  <b-button variant="outline-primary" v-if="idx % 4 == 1" block @click="calcScore(playerData.setNo)">再計算</b-button>
                  <b-button variant="outline-primary" v-if="idx % 4 == 2" block @click="saveScore(playerData.setNo)">保存</b-button>
                  <b-button variant="outline-primary" v-if="idx % 4 == 3" block disabled>拡大表示</b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>
      <hr>

      <b-row align-h="end">
        <b-col cols="3">
          <b-button variant="outline-primary" block disabled>1回戦終了</b-button>
        </b-col>
      </b-row>

    </b-container>

    <!-- ダイアログ -->
    <notification-dialog ref="saveNotificationDialog" message="保存しました！"></notification-dialog>
  </div>
</template>

<script>
import Constants from '../Constants.js'
import FileUtils from '../logic/FileUtils.js'
import PlayerUtils from '../logic/PlayerUtils.js'
import ScoreUtils from '../logic/ScoreUtils.js'
import ScrapingUtils from '../logic/ScrapingUtils.js'

// import ConfirmDialog from './Common/ConfirmDialog'
import NotificationDialog from './Common/NotificationDialog'
// import ErrorDialog from './Common/ErrorDialog'

export default {
  name: 'Round1Screen',
  components: {
    // ConfirmDialog,
    NotificationDialog,
    // ErrorDialog
  },
  data () {
    return {
      extractedPlayersData: [],
      isAutoImportRunning: false,
      isScoreImporting: false,
      GENRE: Constants.GENRE,
      STYLE: Constants.STYLE,
      DIFFICULTY: Constants.DIFFICULTY
    }
  },
  methods: {
    loadRoundPlayersData () {
      FileUtils.loadAllPlayersData().then((loadData) => {
        if (loadData == null) return

        const nPlayers = loadData.length
        for (let set = 1; set <= (Math.ceil(nPlayers / 4)); set++) {
          for (let seat = 1; seat <= 4; seat++) {
            let extracted = PlayerUtils.extractPlayerDataBySetSeatNo(loadData, 'R1', set, seat)
            // プレイヤーデータが取得できなかった場合はダミープレイヤーで上書きする
            if (extracted == null) extracted = PlayerUtils.createDummyPlayer('R1', set, seat)
            const roundData = extracted.roundDatas['R1']
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
    calcScore (setNo) {
      let targetPlayersData = this.extractedPlayersData.filter((e) => {
        return e.setNo == setNo
      })
      ScoreUtils.calcScoreAndDefRate(targetPlayersData, 2)
    },
    formatDefRate (defRate) {
      return ScoreUtils.roundForShow(defRate * 100, 3)
    },
    saveScore (setNo) {
      let targetPlayersData = this.extractedPlayersData.filter((e) => {
        return e.setNo == setNo
      })
      ScoreUtils.updateScore(targetPlayersData, 'R1').then((updatedData) => {
        return FileUtils.saveAllPlayersData(updatedData)
      }).then(() => {
        this.$refs['saveNotificationDialog'].show()
      })
    },
    importScore () {
      this.isScoreImporting = true
      ScrapingUtils.importLatestScore().then((importedDataArray) => {
        // 結果をUIに反映
        for (let importedData of importedDataArray) {
            for (let parentData of this.extractedPlayersData) {
                if (parentData.cardName == importedData.cardName) {
                    // データを設定
                    parentData.genre = importedData.genre
                    parentData.style = importedData.style
                    parentData.difficulty = importedData.difficulty
                    parentData.score = importedData.score
                    break
                }
            }
        }
        this.isScoreImporting = false

        // 処理結果をtoastで表示
        this.$bvToast.toast('最新の成績を取り込みました', {
          title: 'QMA Tournament Supporter',
          solid: true,
          autoHideDelay: 5000,
        })
      }).catch(() => {
        this.isScoreImporting = false
      })
    },
    validScore (score) {
      return (0 <= score && score <= 400) ? null : false
    }
  },
  mounted: function () {
    this.$store.commit('updateCurrentScreen', 'round1')
    this.loadRoundPlayersData()
  }
}
</script>

<style scoped>
div.container-fluid {
  margin-top: 100px;
  margin-bottom: 25px;
}
</style>
