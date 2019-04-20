<template>
  <div id="app">
    <!-- ナビゲーションバー -->
    <b-navbar type="dark" variant="secondary">
      <b-navbar-brand href="#">MYUCUP VIvid poetry</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" disabled>{{screenName}}</b-nav-item>
        </b-navbar-nav>

        <!-- 右寄せアイテム -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item right href="#">投影ウィンドウを○○</b-nav-item>
          <b-nav-item-dropdown right>
            <template slot="button-content"><em>設定</em></template>
            <b-dropdown-item href="#">設定項目1</b-dropdown-item>
            <b-dropdown-item href="#">設定項目2</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item right href="#" v-if="isNeedShowGoMainScreenBtn" @click="goMainScreen()">メイン画面へ</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  methods: {
    goMainScreen () {
      this.$router.replace('/')
    }
  },
  computed: {
    screenName () {
      const name = this.$store.state.currentScreenName
      if (name == 'entry') {
        return 'エントリー'
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
</style>
