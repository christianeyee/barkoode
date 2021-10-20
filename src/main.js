import Vue from 'vue'
import App from './App.vue'
import VueHtml2Canvas from 'vue-html2canvas';
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(VueHtml2Canvas);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
