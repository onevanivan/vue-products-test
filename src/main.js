import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import Vuex from 'vuex'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import VuexPersistedstate from 'vuex-persistedstate'
import {sync} from 'vuex-router-sync'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import firebase from "firebase/app";
import routes from './routes'

Vue.use(VueRouter);
Vue.use(VeeValidate);
Vue.use(Vuex);
Vue.use(VueLodash, { name: 'custom' , lodash: lodash });
Vue.use(ElementUI);

Vue.config.productionTip = false;

const store = new Vuex.Store({
    state: {
        user: false,
        authenticated: false,
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setAuth(state, payload) {
            state.authenticated = payload;
        }
    },
    plugins: [VuexPersistedstate()]
});

const router = new VueRouter(routes);
sync(store, router);

export const eventBus = new Vue();

const firebaseConfig = {
    apiKey: "AIzaSyDEC9zAAukGOSXS6g2NCNYS_2atwcAqYew",
    authDomain: "vue-js-test-460bd.firebaseapp.com",
    databaseURL: "https://vue-js-test-460bd-default-rtdb.firebaseio.com",
    projectId: "vue-js-test-460bd",
    storageBucket: "vue-js-test-460bd.appspot.com",
    messagingSenderId: "469158190636",
    appId: "1:469158190636:web:ffa7b63511ba64cb947b89"
};
firebase.initializeApp(firebaseConfig);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');


