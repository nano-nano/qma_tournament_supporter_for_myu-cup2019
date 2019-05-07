import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 現在表示中の画面名
    currentScreenName: '',
    // 投影ウィンドウのインスタンス
    projectionScreenInstance: null,
    // 投影ウィンドウで表示中の画面を指すpath
    projectionScreenPath: '/'
  },
  mutations: {
    updateCurrentScreen (state, newScreen) {
      state.currentScreenName = newScreen
    },
    showProjectionScreen (state, payload) {
      const remote = require('electron').remote
      const BrowserWindow = remote.BrowserWindow

      let winOptions = { width: 1280, height: 720, autoHideMenuBar: true }
      if (payload.options != null) {
        winOptions = payload.options
      }
      
      const win = new BrowserWindow(winOptions)
      const newPath = (payload.screenPath == null ? state.projectionScreenPath : payload.screenPath)
      win.loadURL(remote.getGlobal('baseUrl') + newPath)
      state.projectionScreenInstance = win
      state.projectionScreenPath = newPath
      state.projectionScreenInstance.on('closed', () => {
        state.projectionScreenInstance = null
      })
    },
    closeProjectionScreen (state) {
      if (state.projectionScreenInstance != null) {
        state.projectionScreenInstance.close()
        state.projectionScreenInstance = null
      }
    },
    updateProjectionScreen (state, newPath) {
      if (newPath == null) {
        return
      }
      if (state.projectionScreenInstance == null) {
        return
      }
      
      const remote = require('electron').remote
      state.projectionScreenInstance.loadURL(remote.getGlobal('baseUrl') + newPath)
      state.projectionScreenPath = newPath
    }
  },
  actions: {

  }
})
