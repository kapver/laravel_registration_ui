import Vue from 'vue'
import App from './App.vue'
import VueCompositionApi from '@vue/composition-api'
import vuetify from './plugins/vuetify'
import store from './store/index'

Vue.use(VueCompositionApi)

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
