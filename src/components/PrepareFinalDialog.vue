<template>
  <div>
    <b-modal ref="modal" size="lg" title="決勝戦座席設定" ok-title="保存して閉じる" cancel-title="保存しないで閉じる" @ok="onOkClicked()">
      <table class="table table-condensed table-hover table-bordered">
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(playerData) of finalistPlayersData" :key="playerData.entryNo">
            <td style="text-align: center; vertical-align: middle;">
              {{playerData.entryNo}}
            </td>
            <td style="text-align: center; vertical-align: middle;">
              {{playerData.isSubCard ? '★' : ''}}{{playerData.cardName}}
            </td>
            <td style="text-align: center; vertical-align: middle;">
              <b-row align-v="center">
                <b-col>
                  <b-form-input type="number" v-model.number="playerData.roundDatas['F'].seatNo"></b-form-input>
                </b-col>
                <b-col cols="3">
                  番
                </b-col>
              </b-row>
            </td>
          </tr>
        </tbody>
      </table>
    </b-modal>
  </div>
</template>

<script>
import FileUtils from '../logic/FileUtils.js'
import PlayerUtils from '../logic/PlayerUtils.js'

  export default {
    data () {
      return {
        finalistPlayersData: []
      }
    },
    methods: {
      show () {
        this.finalistPlayersData = []
        FileUtils.loadAllPlayersData().then((data) => {
          const extractedPlayers = data.filter((e) => {
            return (e.roundDatas['SF'] != undefined && e.roundDatas['SF'].isWin == true)
          })
          for (let playerData of extractedPlayers) {
            if (playerData.roundDatas['F'] == undefined) {
              // データが無ければ作る
              playerData.roundDatas['F'] = PlayerUtils.createEmptyRoundData()
            }
            this.finalistPlayersData.push(playerData)
          }

          this.$refs.modal.show()
        })
      },
      onOkClicked () {
        FileUtils.loadAllPlayersData().then((data) => {
          for (let playerData of this.finalistPlayersData) {
            // EntryNoでデータを寄せ、上書きする
            const idx = data.findIndex((e) => { return e.entryNo == playerData.entryNo })
            data.splice(idx, 1, playerData)
          }
          return data
        }).then((newData) => {
          return FileUtils.saveAllPlayersData(newData)
        }).then(() => this.$emit('onSuccess'))
      }
    }
  }
</script>

<style>
</style>
