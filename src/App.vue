<template>
    <div id="app">
        <Header/>
        <router-view/>
    </div>
</template>

<script>
    import Header from './components/Header'

    export default {
        name: 'App',
        components: {
            Header
        },
        created() {
            this.$router.beforeEach(async (to, from, next) => {
                console.log(to, from, next)
                // делать запрос записывать в store authorized
                // в компонентах обращаться к authorized
                next();
            })
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
