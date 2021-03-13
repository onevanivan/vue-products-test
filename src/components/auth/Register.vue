<template>
    <div class="auth_form">
        <h1 class="auth_title">Register</h1>
        <div class="form-item">
            <label class="form-item_label">Email</label>
            <input class="form-item_input" type="text"
                   name="email"
                   placeholder="Example@gmail.com">
        </div>
        <div class="form-item">
            <label class="form-item_label">Full name</label>
            <input class="form-item_input" type="text"
                   name="full_name"
                   placeholder="Tony Stark">
        </div>
        <div class="form-item">
            <label class="form-item_label">Password</label>
            <input class="form-item_input" type="text" name="password">
        </div>
        <div class="form-item">
            <label class="form-item_label">Password again</label>
            <input class="form-item_input" type="text" name="password_again">
        </div>
        <div class="btn-big auth_btn-register" @click="register()">Register</div>
    </div>
</template>

<script>
    export default {
        name: 'Register',
        data: () => ({
            email: '',
            password: '',
            fullName: '',
            passwordAgain: ''
        }),
        methods: {
            register() {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        // Signed in
                        var user = userCredential.user;
                        // ...
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // ..
                    });
            }
        }
    }
</script>

<style lang="scss">
    .auth_btn-register {
        margin-top: 32px;
    }
</style>