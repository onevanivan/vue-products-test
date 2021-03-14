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

import firebase from "firebase/app";
import "firebase/auth";
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


