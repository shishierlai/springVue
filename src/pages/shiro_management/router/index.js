import Vue from 'vue'
import Router from 'vue-router'
import index from '../index.vue'
import user from '../user.vue'
import role from '../role.vue'
import role_edit from '../role_edit.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/role',
      name: 'role',
      component: role
    },

    {
      path: '/role_add',
      name: 'role_add',
      component: role_edit
    },
    {
      path: '/role_edit/:id',
      name: 'role_edit',
      component: role_edit
    },

  ]
})
