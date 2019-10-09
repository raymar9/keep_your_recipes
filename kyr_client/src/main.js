import Vue from 'vue'
import App from './App.vue'
import '../node_modules/bulma/bulma.sass'
import '../node_modules/@icon/open-iconic/open-iconic.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
