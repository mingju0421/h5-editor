import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './common/iconfont/iconfont.css'
import './common/css/reset.css'

import App from './App.vue'
import router from './router'
import store from './store'
import userModel from './mixins/userModel'
import * as Utils from './common/js/Utils'

Vue.mixin(userModel)

Vue.config.productionTip = false

Vue.use(Element)

/** 引入公共方法 */
Vue.prototype.$Utils = Utils

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
