<template>
  <div class="test-display-screen">
    <!-- 上下左右中央に設置 -->
    <div class="d-flex align-items-center justify-content-center" style="height: 100vh;">
      <!-- 画像サイズは最大の情報量になる1回戦の描画エリアサイズに合わせる -->
      <img class="img" src="../../assets/color_bar.png" style="width: 1890px; height: 890px;"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestDisplayScreen',
  data () {
    return {
    }
  },
}
</script>

<style scoped>
</style>
