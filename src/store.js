import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 現在表示中の画面名
    currentScreenName: '',
    // 投影ウィンドウのインスタンス
    projectionScreenInstance: null,
  },
  mutations: {
    updateCurrentScreen (state, newScreen) {
      state.currentScreenName = newScreen
    },
    showProjectionScreen (state, payload) {
      if (payload.screenPath == null) {
        return
      }

      const remote = require('electron').remote
      const BrowserWindow = remote.BrowserWindow

      let winOptions = { width: 1280, height: 720, autoHideMenuBar: true, enableLargerThanScreen: true }
      if (payload.options != null) {
        winOptions = payload.options
      }
      
      const win = new BrowserWindow(winOptions)
      win.loadURL(remote.getGlobal('baseUrl') + payload.screenPath)
      state.projectionScreenInstance = win
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
    },
    sendMsgToProjectionScreen (state, payload) {
      if (state.projectionScreenInstance != null && payload.channel != null) {
        state.projectionScreenInstance.webContents.send(payload.channel, payload.args)
      }
    }
  },
  actions: {

  }
})
