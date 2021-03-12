<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style lang="scss">
    @import './assets/scss/global';
    @import './assets/scss/components';

    #app {
        height: 100%;
    }
</style>
