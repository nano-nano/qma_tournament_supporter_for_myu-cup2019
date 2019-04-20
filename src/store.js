import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 現在表示中の画面
    currentScreenName: ''
  },
  mutations: {
    updateCurrentScreen (state, newScreen) {
      state.currentScreenName = newScreen
    }
  },
  actions: {

  }
})
