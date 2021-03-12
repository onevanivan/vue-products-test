<template>
    <div class="auth">
        <Register v-if="showRegister"/>
        <Login v-else/>
    </div>
</template>

<script>
    import Login from './Login';
    import Register from './Register';

    export default {
        name: 'Auth',
        components: {
            Login,
            Register
        },
        data: () => ({
            showRegister: false
        })
    }
</script>

<style lang="scss">
    .auth {
        .auth_form {
            background: $gray_1;
            box-shadow: 0 2px 42px rgba(0, 0, 0, 0.111233);
            border-radius: 7px;
        }

        .auth_title {

        }

        .form-item {

        }
    }
</style>