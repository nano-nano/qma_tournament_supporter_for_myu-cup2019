<template>
  <div class="entry-screen">
    <b-container>
      <b-row align-h="between">
        <b-col cols="4">
          <b-button variant="outline-primary">エントリーExcelデータをインポート</b-button>
        </b-col>
        <b-col cols="3">
          <b-row align-h="end">
            <b-col cols="6">
              <b-button block variant="outline-primary">再読み込み</b-button>
            </b-col>
            <b-col cols="6">
              <b-button block variant="outline-primary">保存</b-button>
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
                <th>EntryNo.</th>
                <th>CardName</th>
                <th>isSubCard</th>
                <th>有効エントリー</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="playerData of allPlayersData" :key="playerData.entryNo">
                <td style="text-align: center; vertical-align: middle;">{{playerData.entryNo}}</td>
                <td style="text-align: center; vertical-align: middle;">{{playerData.cardName}}</td>
                <td style="text-align: center; vertical-align: middle;"></td>
                <td style="text-align: center; vertical-align: middle;"></td>
              </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>

      <b-row align-h="end">
        <b-col cols="2">
          <b-button block variant="outline-primary">プレイヤー追加</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'EntryScreen',
  data () {
    return {
      allPlayersData: [
        {entryNo: 0, cardName: "ダミー", isSubCard: false, roundDatas: {aaa: "hoge"} }
      ]
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
