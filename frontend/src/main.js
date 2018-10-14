import Vue from 'vue'

import App from '@/App'

import {router} from '@/router'
import {store} from '@/store'
import auth from '@/auth'
import DialogCustom from './components/DialogCustom.vue'
import newNetworkForm from './components/newNetworkForm.vue'



Vue.config.productionTip = false

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'


Vue.use(VueMaterial)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  beforeCreate () {
    auth.init(this)
  },
  template: '<App/>',
  components: { App }
})

