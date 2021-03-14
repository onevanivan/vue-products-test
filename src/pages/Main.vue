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
        align-items: flex-start;
        justify-content: center;


        @media screen and (min-width: 600px) {
            padding-top: 40px;
        }

        @media screen and (min-width: 12024px) {
            padding-top: 80px;
        }
    }
</style>