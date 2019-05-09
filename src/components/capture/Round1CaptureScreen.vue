<template>
  <div class="round1-screen">
    <b-container fluid>
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
                <th width="8.75%">得点</th>
                <th width="5%">順位</th>
                <th width="5%">勝抜</th>
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
                  {{playerData.cardName}}
                </td>
                <td style="text-align: center; vertical-align: middle;" :class="computeTableClass(playerData.entryNo == 999, playerData.setNo % 2 == 0)">
                  {{playerData.genre}}
                </td>
                <td style="text-align: center; vertical-align: middle;" :class="computeTableClass(playerData.entryNo == 999, playerData.setNo % 2 == 0)">
                  {{playerData.style}}
                </td>
                <td style="text-align: center; vertical-align: middle;" :class="computeTableClass(playerData.entryNo == 999, playerData.setNo % 2 == 0)">
                  {{playerData.difficulty}}
                </td>
                <td style="text-align: center; vertical-align: middle;" :class="computeTableClass(playerData.entryNo == 999, playerData.setNo % 2 == 0)">
                  {{playerData.score}}
                </td>
                <td style="text-align: center; vertical-align: middle;" :class="computeTableClass(playerData.entryNo == 999, playerData.setNo % 2 == 0)">
                  {{playerData.rank}}
                </td>
                <td style="text-align: center; vertical-align: middle;" :class="computeTableClass(playerData.entryNo == 999, playerData.setNo % 2 == 0)">
                  {{playerData.isWin ? 'WIN!!' : ''}}
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { setInterval, clearInterval } from 'timers'

import Constants from '../Constants.js'
import CommonUtils from '../logic/CommonUtils.js'
import FileUtils from '../logic/FileUtils.js'
import PlayerUtils from '../logic/PlayerUtils.js'

export default {
  name: 'Round1Screen',
  components: {
  },
  data () {
    return {
      extractedPlayersData: [],
      fetchTimer: null,
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
  },
  mounted: function () {
    this.loadRoundPlayersData()
  },
}
</script>

<style scoped>
div.container-fluid {
  margin-top: 100px;
  margin-bottom: 25px;
}
</style>
