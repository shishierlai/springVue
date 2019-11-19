// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import app from './app.vue'

import Element from 'element-ui'
Vue.use(Element)
import router from './router'

import 'element-ui/lib/theme-chalk/index.css'


import ajax from '../../js/ajax.js'
Vue.prototype.$ajax = ajax

import sui from '../../../sui';
Vue.use(sui);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { app },
  template: '<app/>'
})
