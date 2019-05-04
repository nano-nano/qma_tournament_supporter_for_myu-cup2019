<template>
  <div id="app">
    <!-- ナビゲーションバー -->
    <b-navbar type="dark" variant="secondary" fixed="top">
      <b-navbar-brand href="#">MYUCUP VIvid poetry</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-text>{{screenName}}</b-nav-text>
        </b-navbar-nav>

        <!-- 右寄せアイテム -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item right href="#">投影ウィンドウを○○</b-nav-item>
          <b-nav-item-dropdown right>
            <template slot="button-content"><em>設定</em></template>
            <b-dropdown-item href="#" @click="showScoreImportUrlDialog()">試合結果取得設定</b-dropdown-item>
            <b-dropdown-item href="#">設定項目2</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item right href="#" v-if="isNeedShowGoMainScreenBtn" @click="goMainScreen()">メイン画面へ</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view/>

    <!-- ダイアログ -->
    <score-import-settings-dialog ref="scoreImportSettingsDialog"></score-import-settings-dialog>
  </div>
</template>

<script>
import ScoreImportSettingsDialog from './components/settings/ScoreImportSettingsDialog'

export default {
  name: 'App',
  components: {
    ScoreImportSettingsDialog,
  },
  data () {
    return {
    }
  },
  methods: {
    goMainScreen () {
      this.$router.replace('/')
    },
    showScoreImportUrlDialog () {
      this.$refs['scoreImportSettingsDialog'].show()
    }
  },
  computed: {
    screenName () {
      const name = this.$store.state.currentScreenName
      if (name == 'entry') {
        return 'エントリー'
      } else if (name == 'round1') {
        return '１回戦'
      }
      return ''
    },
    isNeedShowGoMainScreenBtn () {
      return this.$store.state.currentScreenName != 'main'
    }
  }
}
</script>

<style>
/* スクロールあり/なし画面でスクロールバーによりチラつくのを防ぐための設定 */
body {
  overflow-y: scroll;
}
</style>
