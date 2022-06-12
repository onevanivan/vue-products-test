import Vuex from "vuex";
import VuexPersistedstate from "vuex-persistedstate";
import Vue from "vue";
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: false,
        authenticated: false,
    },
    getters: {
        isAuthenticated: state => !!state.authenticated,
        user: state => state.user
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

export default store;