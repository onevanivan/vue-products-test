<template>
    <div class="page main">
        <Auth/>
    </div>
</template>

<script>
    import Auth from '../components/auth/Auth';

    export default {
        name: 'Main',
        components: {
            Auth
        }
    }
</script>

<style lang="scss">
    .main {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>