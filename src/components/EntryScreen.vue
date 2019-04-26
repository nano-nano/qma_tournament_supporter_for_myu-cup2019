<template>
  <div class="entry-screen">
    <b-container>
      <b-row align-h="between">
        <b-col cols="4">
          <b-button variant="outline-primary" disabled>エントリーExcelデータをインポート</b-button>
        </b-col>
        <b-col cols="3">
          <b-row align-h="end">
            <b-col cols="6">
              <b-button block variant="outline-primary" disabled>再読み込み</b-button>
            </b-col>
            <b-col cols="6">
              <b-button block variant="outline-primary" @click="saveData">保存</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <hr>

      <!-- エントリーデータリスト -->
      <b-row>
        <b-col>
          <table class="table table-condensed table-hover table-bordered">
            <thead>
              <tr>
                <th width="10%">EntryNo.</th>
                <th width="20%">カードネーム</th>
                <th width="10%">サブカード</th>
                <th colspan="2" width="40%">1回戦座席</th>
                <th width="20%"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(playerData, idx) of allPlayersData" :key="playerData.entryNo">
                <td style="text-align: center; vertical-align: middle;">
                  {{playerData.entryNo}}
                </td>
                <td style="text-align: center; vertical-align: middle;">
                  <b-form-input v-model="playerData.cardName"></b-form-input>
                </td>
                <td style="text-align: center; vertical-align: middle;">
                  <b-form-checkbox v-model="playerData.isSubCard"></b-form-checkbox>
                </td>
                <td>
                  <b-row align-v="center">
                    <b-col cols="2">
                      第
                    </b-col>
                    <b-col>
                      <b-form-input v-model="playerData.roundDatas['R1'].setNo"></b-form-input>
                    </b-col>
                    <b-col cols="3">
                      試合
                    </b-col>
                  </b-row>
                </td>
                <td style="text-align: center; vertical-align: middle;">
                  <b-row align-v="center">
                    <b-col>
                      <b-form-input v-model="playerData.roundDatas['R1'].seatNo"></b-form-input>
                    </b-col>
                    <b-col cols="3">
                      番
                    </b-col>
                  </b-row>
                </td>
                <td style="text-align: center; vertical-align: middle;">
                  <b-button-group class="mx-1">
                    <b-button variant="outline-primary" @click="upToData(idx)">↑</b-button>
                    <b-button variant="outline-primary" @click="downToData(idx)">↓</b-button>
                  </b-button-group>
                  <b-button-group class="mx-1">
                    <b-button variant="outline-danger" @click="confirmDeleteData(playerData.entryNo)">削除</b-button>
                  </b-button-group>
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>

      <b-row align-h="end">
        <b-col cols="2">
          <b-button block variant="outline-primary" @click="addNewPlayerData()">プレイヤー追加</b-button>
        </b-col>
      </b-row>
    </b-container>

    <!-- ダイアログ -->
    <confirm-dialog ref="deleteConfirmDialog" 
      message="削除します。よろしいですか？<br>（この操作は元に戻せません）"
      v-on:onOkClicked="deletePlayerData"></confirm-dialog>
    <notification-dialog ref="saveNotificationDialog" message="保存しました！"></notification-dialog>
  </div>
</template>

<script>
import FileUtils from '../logic/FileUtils.js'
import PlayerUtils from '../logic/PlayerUtils.js'

import ConfirmDialog from './Common/ConfirmDialog'
import NotificationDialog from './Common/NotificationDialog'

export default {
  name: 'EntryScreen',
  components: {
    ConfirmDialog,
    NotificationDialog
  },
  data () {
    return {
      allPlayersData: [
      ],
      deleteTargetEntryNo: -1
    }
  },
  methods: {
    addNewPlayerData () {
      const entryNoList = this.allPlayersData.map(function(o){return o.entryNo})
      const maxEntryNo = (entryNoList.length == 0 ? 0 : Math.max.apply(null, entryNoList))
      let newPlayer = PlayerUtils.createPlayerData(parseInt(maxEntryNo) + 1, '', false)
      newPlayer.roundDatas['R1'] = PlayerUtils.createEmptyRoundData()
      this.allPlayersData.push(newPlayer)
    },
    confirmDeleteData (targetEntryNo) {
      // ダイアログ表示
      this.$refs['deleteConfirmDialog'].show()
      this.deleteTargetEntryNo = targetEntryNo
    }, 
    deletePlayerData () {
      let newList = []
      for (const playerData of this.allPlayersData) {
        if (playerData.entryNo != this.deleteTargetEntryNo) {
          newList.push(playerData)
        }
      }
      this.allPlayersData = newList
    },
    upToData (index) {
      if (index == 0) {
          // 先頭なので、これ以上上げられない
          return
      }

      const target = this.allPlayersData[index]
      this.allPlayersData.splice(index, 1)
      this.allPlayersData.splice(index - 1, 0, target)
    },
    downToData (index) {
      if (index == (this.allPlayersData.length - 1)) {
        // 末尾なので、これ以上上げられない
        return;
      }

      const target = this.allPlayersData[index]
      this.allPlayersData.splice(index, 1)
      this.allPlayersData.splice(index + 1, 0, target)
    },
    saveData () {
      FileUtils.saveAllPlayersData(this.allPlayersData)
        .then(() => {
          this.$refs['saveNotificationDialog'].show()
        })
    }
  },
  mounted: function () {
    this.$store.commit('updateCurrentScreen', 'entry')
  }
}
</script>

<style scoped>
div.container {
  margin-top: 10px;
}
</style>
