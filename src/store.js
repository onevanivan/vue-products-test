import Vuex from "vuex";
import VuexPersistedstate from "vuex-persistedstate";
import Vue from "vue";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: false,
        authenticated: false,
        loading: false
    },
    getters: {
        isAuthenticated: state => !!state.authenticated,
        user: state => state.user,
        isLoading: state => state.loading
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setAuth(state, payload) {
            state.authenticated = payload;
        },
        setLoading(state, payload) {
            state.loading = payload;
        }
    },
    plugins: [VuexPersistedstate()]
});

export default store;