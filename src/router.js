import Vue from 'vue'
import Router from 'vue-router'

import MainScreen from './components/MainScreen.vue'
import EntryScreen from './components/EntryScreen.vue'
import Round1Screen from './components/Round1Screen.vue'
import Round2Screen from './components/Round2Screen.vue'
import SemiFinalScreen from './components/SemiFinalScreen.vue'
import FinalScreen from './components/FinalScreen.vue'

import EmptyScreen from './components/projection/EmptyScreen.vue'
import TestDisplayScreen from './components/projection/TestDisplayScreen.vue'
import Round1ProjectionScreen from './components/projection/Round1ProjectionScreen.vue'
import Round2ProjectionScreen from './components/projection/Round2ProjectionScreen.vue'
import SemiFinalProjectionScreen from './components/projection/SemiFinalProjectionScreen.vue'
import FinalProjectionScreen from './components/projection/FinalProjectionScreen.vue'

import Round1CaptureScreen from './components/capture/Round1CaptureScreen.vue'
import Round2CaptureScreen from './components/capture/Round2CaptureScreen.vue'
import SemiFinalCaptureScreen from './components/capture/SemiFinalCaptureScreen.vue'
import FinalCaptureScreen from './components/capture/FinalCaptureScreen.vue'

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
    {
      path: '/round2',
      name: 'round2',
      component: Round2Screen
    },
    {
      path: '/semiFinal',
      name: 'semiFinal',
      component: SemiFinalScreen
    },
    {
      path: '/final',
      name: 'final',
      component: FinalScreen
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
    {
      path: '/round2Projection',
      name: 'round2Projection',
      component: Round2ProjectionScreen
    },
    {
      path: '/semiFinalProjection',
      name: 'semiFinalProjection',
      component: SemiFinalProjectionScreen
    },
    {
      path: '/finalProjection',
      name: 'finalProjection',
      component: FinalProjectionScreen
    },
    // ツイートキャプチャ用ウィンドウ
    {
      path: '/round1Capture',
      name: 'round1Capture',
      component: Round1CaptureScreen
    },
    {
      path: '/round2Capture',
      name: 'round2Capture',
      component: Round2CaptureScreen
    },
    {
      path: '/semiFinalCapture',
      name: 'semiFinalCapture',
      component: SemiFinalCaptureScreen
    },
    {
      path: '/finalCapture',
      name: 'finalCapture',
      component: FinalCaptureScreen
    },
  ]
})
