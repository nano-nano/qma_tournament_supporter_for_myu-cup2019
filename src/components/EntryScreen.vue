<template>
  <div class="entry-screen">
    <h1>エントリー画面予定地</h1>
  </div>
</template>

<script>
export default {
  name: 'EntryScreen',
  mounted: function () {
    this.$store.commit('updateCurrentScreen', 'entry')
  }
}
</script>

<style scoped>
</style>
