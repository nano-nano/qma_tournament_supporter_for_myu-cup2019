<template>
  <div class="round1-screen">
    <b-navbar type="dark" variant="secondary" fixed="top">
      <b-navbar-brand href="#">MYUCUP VIvid poetry</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-text>準決勝戦　[8 → 4]</b-nav-text>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container fluid>
      <!-- 組み合わせデータテーブル -->
      <b-row>
        <b-col>
          <table class="table table-condensed table-hover table-bordered table-sm">
            <thead>
              <tr>
                <th>試合ID</th>
                <th>Entry</th>
                <th>カードネーム（★: サブカ）</th>
                <th>ジャンル</th>
                <th>形式</th>
                <th>難易度</th>
                <th>得点</th>
                <th>順位</th>
                <th>勝抜</th>
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
import FileUtils from '../../logic/FileUtils.js'
import PlayerUtils from '../../logic/PlayerUtils.js'

export default {
  name: 'Round1Screen',
  components: {
  },
  data () {
    return {
      extractedPlayersData: [],
    }
  },
  methods: {
    loadRoundPlayersData () {
      FileUtils.loadAllPlayersData().then((loadData) => {
        if (loadData == null) return

        const nPlayers = loadData.filter((e) => { return e.roundDatas['SF'] != undefined }).length
        for (let set = 1; set <= (Math.ceil(nPlayers / 4)); set++) {
          for (let seat = 1; seat <= 4; seat++) {
            let extracted = PlayerUtils.extractPlayerDataBySetSeatNo(loadData, 'SF', set, seat)
            const roundData = extracted.roundDatas['SF']
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
    },
  },
  mounted: function () {
    this.loadRoundPlayersData()
  },
}
</script>

<style scoped>
@font-face {
  /* 大会タイトル用フォント */
  font-family: "Cameliabold";
  src: url("../../assets/CAMELIAB.TTF");
}
/* ナビゲーションバー */
a.navbar-brand {
  font-family: "Cameliabold";
  font-size: 1.8rem;
}
div#nav-collapse {
  font-size: 1.4rem;
}

div.container-fluid {
  margin-top: 105px;
  margin-bottom: 25px;
}
</style>
