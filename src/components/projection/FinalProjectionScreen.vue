<template>
  <div class="round1-projection-screen">
    <!-- ナビゲーションバー -->
    <b-navbar type="light" fixed="top" style="background-color: #e7e2fd; padding-bottom: 11px; padding-top: 11px;">
      <b-navbar-brand href="#">MYUCUP VIvid poetry</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-text>Final</b-nav-text>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container>
      <b-row>
        <table class="table">
          <thead>
          </thead>
          <tbody v-for="(playerData, idx) of displayedData" :key="idx">
            <tr>
              <td rowspan="3" width="35%">
                EntryNo. {{playerData.entryNo}}<br>
                {{playerData.cardName}}
              </td>
              <td>
                １回戦: {{getSelectedQuizLabel(playerData.roundDatas['R1'])}}<br>
                ２回戦: {{getSelectedQuizLabel(playerData.roundDatas['R2'])}}<br>
                準決勝戦: {{getSelectedQuizLabel(playerData.roundDatas['SF'])}}<br>
              </td>
            </tr>
          </tbody>
        </table>
      </b-row>

    </b-container>

    <!-- ダイアログ -->
    <set-close-up-dialog ref="setCloseUpDialog" roundName="SF"></set-close-up-dialog>
  </div>
</template>

<script>
import FileUtils from '../../logic/FileUtils.js'
import PlayerUtils from '../../logic/PlayerUtils.js'

import SetCloseUpDialog from '../common/SetCloseUpDialog'

export default {
  name: 'FinalProjectionScreen',
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

        for (let seat = 1; seat <= 4; seat++) {
          this.displayedData.push(PlayerUtils.extractPlayerDataBySetSeatNo(loadData, 'F', 1, seat))
        }
      })
    },
    showCloseUpDialog (setNo) {
      this.$refs['setCloseUpDialog'].toggleDialog(setNo)
    },
    getSelectedQuizLabel (roundData) {
      return roundData.genre + ' / ' + roundData.style + '　' + roundData.rank + '位'
    }
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
div.container {
  margin-top: 125px;
}
b.setName {
  font-size: 2.4rem;
}
th, td {
  font-size: 2.0rem;
}
</style>
