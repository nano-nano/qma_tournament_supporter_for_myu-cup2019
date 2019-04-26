<template>
  <div class="round1-screen">
    <b-container fluid>
      <!-- 制御エリア -->
      <b-row align-h="between">
        <b-col cols="3">
          <b-button variant="outline-primary" block disabled>投影画面に投影</b-button>
        </b-col>
        <b-col cols="3">
          <b-button variant="outline-primary" block disabled>Twitter速報</b-button>
        </b-col>
      </b-row>
      <hr>

      <!-- 組み合わせデータテーブル -->
    </b-container>

    <!-- ダイアログ -->
  </div>
</template>

<script>
// import FileUtils from '../logic/FileUtils.js'
// import PlayerUtils from '../logic/PlayerUtils.js'

// import ConfirmDialog from './Common/ConfirmDialog'
// import NotificationDialog from './Common/NotificationDialog'
// import ErrorDialog from './Common/ErrorDialog'

export default {
  name: 'Round1Screen',
  components: {
    // ConfirmDialog,
    // NotificationDialog,
    // ErrorDialog
  },
  data () {
    return {
    }
  },
  methods: {
  },
  mounted: function () {
    this.$store.commit('updateCurrentScreen', 'round1')
  }
}
</script>

<style scoped>
div.container-fluid {
  margin-top: 100px;
  margin-bottom: 25px;
}
</style>
