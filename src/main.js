import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import Vuex from 'vuex'
import VuexPersistedstate from 'vuex-persistedstate'
import {sync} from 'vuex-router-sync'

Vue.use(VueRouter);
Vue.use(VeeValidate);
Vue.use(Vuex);

import routes from './routes'
Vue.config.productionTip = false;

const store = new Vuex.Store({
    state: {
        user:{
            email: '',
            authenticated: false,
            fullName:''
        }
    },
    mutations: {
        setUser(state, payload) {
            state.user = {...payload};
        }
    },
    plugins: [VuexPersistedstate()]
});

const router = new VueRouter(routes);

sync(store, router);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
