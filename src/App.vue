<template>
    <div id="app">
        <Header/>
        <router-view/>
    </div>
</template>

<script>
    import Header from './components/Header'
    import firebase from "firebase/app";

    export default {
        name: 'App',
        components: {
            Header
        },
        created() {
            firebase.auth().onAuthStateChanged((user) => {
                if (!user) {
                    this.$store.commit('setUser', false);
                    this.$store.commit('setAuth', false);
                }
            });

            this.$router.beforeEach((to, from, next) => {
                firebase.auth().onAuthStateChanged((user) => {
                    if (!user) {
                        this.$store.commit('setUser', false);
                        this.$store.commit('setAuth', false);
                    }
                    next();
                });
            });
        }
    }
</script>

<style lang="scss">
    @import "./assets/fonts/stylesheet.css";
    @import './assets/scss/global';
    @import './assets/scss/components';

    #app {
        height: 100%;
    }

    .page {
        flex: 1;
        overflow-y: auto;
    }
</style>
