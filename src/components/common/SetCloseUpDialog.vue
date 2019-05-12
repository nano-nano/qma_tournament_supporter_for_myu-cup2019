<template>
  <div>
    <b-modal ref="modal" size="xl" hide-header hide-footer hide-header-close no-close-on-backdrop>
      <h1>{{dialogTitle}}</h1>
      <table class="table">
        <thead>
        </thead>
          <tr v-for="(playerData, idx) of displayedData" :key="idx"
            :class="{'table-dark': playerData.entryNo == 999}">
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
    </b-modal>
  </div>
</template>

<script>
import FileUtils from '../../logic/FileUtils.js'
import PlayerUtils from '../../logic/PlayerUtils.js'

  export default {
    props: ['roundName'],
    data () {
      return {
        setNo: 0,
        displayedData: []
      }
    },
    methods: {
      toggleDialog (setNo) {
        this.setNo = setNo

        this.displayedData = []
        FileUtils.loadAllPlayersData().then((loadData) => {
          for (let seat = 1; seat <= 4; seat++) {
            this.displayedData.push(PlayerUtils.extractPlayerDataBySetSeatNo(loadData, this.roundName, this.setNo, seat))
          }
        })

        this.$refs.modal.toggle()
      },
    },
    computed: {
      dialogTitle: function () {
        return '第' + this.setNo + '試合'
      }
    }
  }
</script>

<style scoped>
h1 {
  font-size: 4.4rem;
}
th, td {
  font-size: 4.0rem;
}
</style>
