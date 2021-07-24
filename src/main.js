import Vue from 'vue'
import App from './App.vue'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import Vue2Filters from 'vue2-filters'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// State management
import store from '@/store'
import router from './router'

const v2FilterConfig = {
  currency: {
    symbol: '$',
    decimalDigits: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.',
    symbolOnLeft: true,
    spaceBetweenAmountAndSymbol: false,
    showPlusSign: false
  }
}
// Installing useful filters
Vue.use(Vue2Filters, v2FilterConfig)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueSidebarMenu)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  mixins: [Vue2Filters.mixin],
  render: h => h(App)
}).$mount('#app')
