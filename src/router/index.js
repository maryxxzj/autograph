import Vue from 'vue'
import Router from 'vue-router'
import Autograph from '@/components/Autograph.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Autograph',
      component: Autograph
    }
  ]
})
