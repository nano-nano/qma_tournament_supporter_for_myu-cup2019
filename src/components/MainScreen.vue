<template>
  <div class="main-screen">
    <b-container>
      <b-row>
        <b-button size="lg" block variant="outline-primary" @click="goAnotherScreen('entry')">エントリー</b-button>
      </b-row>
      <b-row>
        <b-button size="lg" block variant="outline-primary">１回戦</b-button>
      </b-row>
      <b-row>
        <b-button size="lg" block variant="outline-primary">２回戦</b-button>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'MainScreen',
  methods: {
    goAnotherScreen (name) {
      this.$router.replace(name)
    }
  },
  mounted: function () {
    this.$store.commit('updateCurrentScreen', 'main')
  }
}
</script>

<style scoped>
div.container {
  width: 30%;
  margin-top: 5%;
}
div.row {
  padding-top: 20px;
}
</style>
