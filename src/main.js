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
    apiKey: "AIzaSyAhSuYHoKZ_4pVKChEmmD8cUPzMwvqTTTU",
    authDomain: "avada-media-test.firebaseapp.com",
    databaseURL: "https://avada-media-test-default-rtdb.firebaseio.com",
    projectId: "avada-media-test",
    storageBucket: "avada-media-test.appspot.com",
    messagingSenderId: "332658269283",
    appId: "1:332658269283:web:9ea36ce2d38c49e863ac56"
};
firebase.initializeApp(firebaseConfig);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');


