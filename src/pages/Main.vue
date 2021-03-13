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
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 80px;
    }
</style>