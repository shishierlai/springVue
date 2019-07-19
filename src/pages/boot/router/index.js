import Vue from 'vue'
import Router from 'vue-router'
import index from '../index.vue'
import boot from '../boot.vue'
import boot2 from '../boot2.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/boot',
      name: 'boot',
      component: boot
    },
    {
        path: '/boot2',
        name: 'boot2',
        component: boot2
      },
  ]
})
