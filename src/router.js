import Vue from 'vue'
import Router from 'vue-router'
import MainScreen from './components/MainScreen.vue'
import EntryScreen from './components/EntryScreen.vue'
import Round1Screen from './components/Round1Screen.vue'

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
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
