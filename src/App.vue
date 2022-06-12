<template>
    <div id="app">
        <Loading :loading="isLoading"/>
        <Header/>
        <router-view/>
    </div>
</template>

<script>
    import Header from './components/Header'
    import Loading from './components/Loading'
    import {mapGetters} from "vuex";

    export default {
        name: 'App',
        components: {
            Header,
            Loading
        },
        computed: {
          ...mapGetters(['isLoading']),
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
