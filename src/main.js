import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate';

import routes from './routes'
Vue.use(VueRouter)
Vue.use(VeeValidate)
Vue.config.productionTip = false

const router = new VueRouter(routes);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
