import Vue from 'vue'
import Router from 'vue-router'

import MainScreen from './components/MainScreen.vue'
import EntryScreen from './components/EntryScreen.vue'
import Round1Screen from './components/Round1Screen.vue'

import EmptyScreen from './components/projection/EmptyScreen.vue'
import TestDisplayScreen from './components/projection/TestDisplayScreen.vue'
import Round1ProjectionScreen from './components/projection/Round1ProjectionScreen.vue'

import Round1CaptureScreen from './components/capture/Round1CaptureScreen.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainScreen
    },
    {
      path: '/entry',
      name: 'entry',
      component: EntryScreen
    },
    {
      path: '/round1',
      name: 'round1',
      component: Round1Screen
    },
    // 投影ウィンドウ
    {
      path: '/empty',
      name: 'empty',
      component: EmptyScreen
    },
    {
      path: '/test',
      name: 'test',
      component: TestDisplayScreen
    },
    {
      path: '/round1Projection',
      name: 'round1Projection',
      component: Round1ProjectionScreen
    },
    // ツイートキャプチャ用ウィンドウ
    {
      path: '/round1Capture',
      name: 'round1Capture',
      component: Round1CaptureScreen
    },
  ]
})
