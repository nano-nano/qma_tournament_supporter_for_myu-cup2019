<template>
  <div id="app">
    <!-- ナビゲーションバー -->
    <b-navbar v-if="isNeedNavBar" type="dark" variant="secondary" fixed="top">
      <b-navbar-brand href="#">MYUCUP VIvid poetry</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-text>{{screenName}}</b-nav-text>
        </b-navbar-nav>

        <!-- 右寄せアイテム -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item right href="#" @click="onClickProjectionWinBtn()">
            投影ウィンドウを{{this.$store.state.projectionScreenInstance != null ? '閉じる' : '開く'}}
          </b-nav-item>
          <b-nav-item-dropdown right>
            <template slot="button-content"><em>投影ウィンドウ設定</em></template>
            <b-dropdown-item href="#" @click="onClickEmptyScreen()">空画面を表示</b-dropdown-item>
            <b-dropdown-item href="#" @click="onClickTestScreen()">テスト画面を表示</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right>
            <template slot="button-content"><em>その他設定</em></template>
            <b-dropdown-item href="#" @click="showScoreImportUrlDialog()">試合結果取得設定</b-dropdown-item>
            <b-dropdown-item href="#" @click="openTwitterAuth()">Twitter認証設定</b-dropdown-item>
            <b-dropdown-item href="#">設定項目2</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item right href="#" v-if="isNeedShowGoMainScreenBtn" @click="goMainScreen()">メイン画面へ</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view/>

    <!-- ダイアログ -->
    <score-import-settings-dialog ref="scoreImportSettingsDialog"></score-import-settings-dialog>
    <notification-dialog ref="twiAuthNotificationDialog" message="Twitter認証に成功しました！"></notification-dialog>
  </div>
</template>

<script>
import TwitterUtils from './logic/TwitterUtils.js'

import ScoreImportSettingsDialog from './components/settings/ScoreImportSettingsDialog'
import NotificationDialog from './components/common/NotificationDialog'

export default {
  name: 'App',
  components: {
    ScoreImportSettingsDialog,
    NotificationDialog,
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
    },
    onClickProjectionWinBtn () {
      if (this.$store.state.projectionScreenInstance == null) {
        // 投影ウィンドウは開いていない
        this.$store.commit('showProjectionScreen', {
          screenPath: this.$router.resolve('empty').href,
          options: { width: 1920, height: 1000, autoHideMenuBar: true }
        })
      } else {
        // 投影ウィンドウは開いている
        this.$store.commit('closeProjectionScreen')
      }
    },
    onClickEmptyScreen () {
      this.$store.commit('updateProjectionScreen', this.$router.resolve('empty').href)
    },
    onClickTestScreen () {
      this.$store.commit('updateProjectionScreen', this.$router.resolve('test').href)
    },
    openTwitterAuth () {
      TwitterUtils.startAuthRequest().then(() => {
        this.$refs['twiAuthNotificationDialog'].show()
      }).catch((err) => console.debug(err))
    }
  },
  computed: {
    screenName () {
      const name = this.$store.state.currentScreenName
      if (name == 'entry') {
        return 'エントリー'
      } else if (name == 'round1') {
        return '１回戦'
      } else if (name == 'round2') {
        return '２回戦'
      }
      return ''
    },
    isNeedShowGoMainScreenBtn () {
      return this.$store.state.currentScreenName != 'main'
    },
    isNeedNavBar () {
      // 投影画面でNavBarを出さないための対策
      const name = this.$router.currentRoute.name
      return (name != 'empty'
              && name != 'test'
              && name != 'round1projection'
              && name != 'round2projection'
              && name != 'round1Capture')
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
