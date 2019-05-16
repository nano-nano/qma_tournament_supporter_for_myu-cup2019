<template>
  <div class="main-screen">
    <b-container>
      <b-row>
        <b-button size="lg" block variant="outline-primary" @click="goAnotherScreen('entry')">エントリー管理</b-button>
      </b-row>
      <b-row>
        <b-button size="lg" block variant="outline-primary" @click="goAnotherScreen('round1')">１回戦</b-button>
      </b-row>
      <b-row>
        <b-button size="lg" block variant="outline-primary" @click="goAnotherScreen('round2')">２回戦</b-button>
      </b-row>
      <b-row>
        <b-button size="lg" block variant="outline-primary" @click="goAnotherScreen('semiFinal')">準決勝戦</b-button>
      </b-row>
      <b-row>
        <b-button size="lg" block variant="outline-primary" disabled>決勝戦</b-button>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Constants from '../Constants.js'
import FileUtils from '../logic/FileUtils.js'

export default {
  name: 'MainScreen',
  methods: {
    goAnotherScreen (name) {
      this.$router.replace(name)
    }
  },
  mounted: function () {
    this.$store.commit('updateCurrentScreen', 'main')
    // 参加者データJSONファイルがあるかの確認、なければ空のファイルを作っておく
    if (!FileUtils.isAllPlayersDataJsonExist()) {
      FileUtils.saveAllPlayersData({})
    }
    // 設定JSONファイルがあるかの確認、なければ空のファイルを作っておく
    if (!FileUtils.isJsonFileExist(Constants.SETTING_FILE_NAME)) {
      FileUtils.saveJsonFile(Constants.SETTING_FILE_NAME, {})
    }
  }
}
</script>

<style scoped>
div.container {
  width: 30%;
  margin-top: 10%;
  margin-bottom: 7.5%;
}
div.row {
  padding-top: 30px;
}
</style>
