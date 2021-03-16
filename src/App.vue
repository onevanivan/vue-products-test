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
                if (from.name === 'main') {
                    let databaseUser = firebase.auth().currentUser;
                    if (databaseUser) {
                        let user = {
                            id: databaseUser.uid,
                            email: databaseUser.email,
                        };
                        let starCountRef = firebase.database().ref(`users/${databaseUser.uid}`);
                        starCountRef.on('value', (snapshot) => {
                            const data = snapshot.val();
                            user.fullName = data.fullName;
                            this.$store.commit('setUser', user);
                        });
                    }
                }

                firebase.auth().onAuthStateChanged((user) => {
                    if (!user) {
                        this.$store.commit('setUser', false);
                        this.$store.commit('setAuth', false);
                    }
                });
                next();
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
