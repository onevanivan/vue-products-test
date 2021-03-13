<template>
    <div class="auth_form">
        <h1 class="auth_title">Login</h1>
        <div class="form-item">
            <label class="form-item_label">Email</label>
            <input class="form-item_input" type="text" placeholder="Example@gmail.com">
        </div>
        <div class="form-item">
            <label class="form-item_label">Password</label>
            <div class="form-item_input-wrap">
                <input class="form-item_input password" :type="passwordType">
                <Eye class="form-item_icon"
                     :class="{hidden:passwordType === 'password'}"
                     @click="togglePasswordVisible()"/>
            </div>
            <p class="auth_note">Don’t remember password?</p>
        </div>
        <div class="btn-big auth_btn-login">Continue</div>
    </div>
</template>

<script>
    import Eye from '@/assets/img/eye.svg';

    export default {
        name: 'Login',
        components: {
            Eye
        },
        data: () => ({
            passwordType: 'text'
        }),
        methods: {
            togglePasswordVisible() {
                this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
            }
        }
    };
</script>