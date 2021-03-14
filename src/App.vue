<template>
    <div id="app">
        <Header/>
        <router-view/>
    </div>
</template>

<script>
    import Header from './components/Header'
    import firebase from "firebase/app";
    import "firebase/auth";

    export default {
        name: 'App',
        components: {
            Header
        },
        created() {
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

            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    if (this.$route.name === 'main') {
                        this.$router.push('/home');
                    }
                } else {
                    const data = {
                        email: '',
                        authenticated: false,
                        fullName: ''
                    };
                    this.$store.commit('setUser', data);
                }
            });

            this.$router.beforeEach(async (to, from, next) => {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        if (this.$route.name === 'main') {
                            this.$router.push('/home');
                        }
                    } else {
                        const data = {
                            email: '',
                            authenticated: false,
                            fullName: ''
                        };
                        this.$store.commit('setUser', data);
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
        display: flex;
        flex-direction: column;
    }

    .page {
        flex: 1;
        overflow-y: auto;
    }
</style>
