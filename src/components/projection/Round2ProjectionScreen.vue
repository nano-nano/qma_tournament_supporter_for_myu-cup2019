<template>
  <div class="round1-projection-screen">
    <!-- ナビゲーションバー -->
    <b-navbar type="light" fixed="top" style="background-color: #e7e2fd; padding-bottom: 11px; padding-top: 11px;">
      <b-navbar-brand href="#">MYUCUP VIvid poetry</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-text>Round2 [16 → 8]</b-nav-text>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container fluid>
      <b-row v-for="(rowData, idx) of displayedData" :key="idx">
        <b-col v-for="(setData, idx) of rowData" :key="idx">
          <b class="setName">第{{setData[0].setNo}}試合</b>
          <table class="table">
            <thead>
            </thead>
              <tr v-for="(playerData, idx) of setData" :key="idx"
                :class="{'table-dark': playerData.entryNo == 999, 'table-primary': playerData.isWin}">
                <td style="text-align: center; vertical-align: middle;">
                  {{playerData.entryNo}}
                </td>
                <td style="text-align: center; vertical-align: middle;">
                  {{playerData.isSubCard ? '★' : ''}}
                  {{playerData.cardName}}
                </td>
              </tr>
            <tbody>
            </tbody>
          </table>
        </b-col>
      </b-row>
    </b-container>

    <!-- ダイアログ -->
    <set-close-up-dialog ref="setCloseUpDialog" roundName="R2"></set-close-up-dialog>
  </div>
</template>

<script>
import FileUtils from '../../logic/FileUtils.js'
import PlayerUtils from '../../logic/PlayerUtils.js'

import SetCloseUpDialog from '../common/SetCloseUpDialog'

const SETS_PAR_ROW = 2 // 1行あたりの試合数

export default {
  name: 'Round1ProjectionScreen',
  components: {
    SetCloseUpDialog
  },
  data () {
    return {
      displayedData: []
    }
  },
  methods: {
    loadRoundPlayersData () {
      this.displayedData = []
      FileUtils.loadAllPlayersData().then((loadData) => {
        if (loadData == null) return

        const nPlayers = 16
        let rowSets
        for (let set = 1; set <= (Math.ceil(nPlayers / 4)); set++) {
          if (((set - 1) % SETS_PAR_ROW) == 0) {
            // 1行分の試合を入れる配列をリセット
            rowSets = []
          }

          let setPlayers = []
          for (let seat = 1; seat <= 4; seat++) {
            let extracted = PlayerUtils.extractPlayerDataBySetSeatNo(loadData, 'R2', set, seat)
            const roundData = extracted.roundDatas['R2']
            setPlayers.push({
                entryNo: extracted.entryNo,
                cardName: extracted.cardName,
                isSubCard: extracted.isSubCard,
                setNo: roundData.setNo,
                seatNo: roundData.seatNo,
                isWin: roundData.isWin,
            })
          }
          rowSets.push(setPlayers)
          if ((set % SETS_PAR_ROW) == 0) {
            // 1行分が完成したのでdisplayedDataにセット
            this.displayedData.push(rowSets)
          }
        }
      })
    },
    showCloseUpDialog (setNo) {
      this.$refs['setCloseUpDialog'].toggleDialog(setNo)
    },
  },
  mounted: function () {
    this.loadRoundPlayersData()

    const ipc = this.$electron.ipcRenderer
    // eslint-disable-next-line
    ipc.on('update', (event, arg) => {
      // 制御画面からアップデートのchannelが届いた場合
      this.loadRoundPlayersData()
    })
    ipc.on('close-up', (event, arg) => {
      // 制御画面から拡大表示のchannelが届いた場合
      this.showCloseUpDialog(arg.setNo)
    })
  }
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
  font-size: 2.4rem;
}
div#nav-collapse {
  font-size: 2.0rem;
}

/* メインコンテンツ */
div.container-fluid {
  margin-top: 125px;
}
b.setName {
  font-size: 2.4rem;
}
th, td {
  font-size: 2.2rem;
}
</style>
