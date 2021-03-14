<template>
    <div class="auth_form">
        <h1 class="auth_title">Register</h1>
        <div class="form-item">
            <div class="form-item_top">
                <label class="form-item_label">Email</label>
                <span class="form-item_error">{{ errors.first('email') }}</span>
            </div>
            <input class="form-item_input" type="text"
                   v-model="email"
                   v-validate="'required|email'"
                   name="email"
                   placeholder="Example@gmail.com">
        </div>
        <div class="form-item">
            <div class="form-item_top">
                <label class="form-item_label">Full name</label>
                <span class="form-item_error">{{ errors.first('full_name') }}</span>
            </div>
            <input class="form-item_input" type="text"
                   v-model="fullName"
                   name="full_name"
                   v-validate="'required'"
                   placeholder="Tony Stark">
        </div>
        <div class="form-item">
            <div class="form-item_top">
                <label class="form-item_label">Password</label>
                <span class="form-item_error">{{ errors.first('password') }}</span>
            </div>
            <input class="form-item_input" type="text"
                   v-model="password"
                   v-validate="'required|min:6'"
                   name="password">
        </div>
        <div class="form-item">
            <div class="form-item_top">
                <label class="form-item_label">Password again</label>
                <span class="form-item_error">{{ errors.first('password_again') }}</span>
            </div>
            <input class="form-item_input" type="text"
                   name="password_again"
                   v-validate="'required'"
                   v-model="passwordAgain">
        </div>
        <div class="btn-big auth_btn-register" @click="register()">Register</div>
    </div>
</template>

<script>
    import firebase from "firebase/app";
    import "firebase/auth";

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
                console.log(this.errors)
                if (!this.errors.first('email')
                    && !this.errors.first('password')
                    && !this.errors.first('fullName')
                    && !this.errors.first('passwordAgain')
                ) {
                    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                        .then((userCredential) => {
                            let data = {
                                email: userCredential.user.email,
                                authenticated: true,
                                fullName: this.fullName
                            };
                            this.$store.commit('setUser', data);
                            this.$router.push('/home');

                            // todo: добавлять пользователя в базу, чтобы забирать его имя при логине
                        })
                        .catch((error) => {
                            console.log(error.code)
                            console.log(error.message)
                        });
                }
            }
        }
    }
</script>

<style lang="scss">
    .auth_btn-register {
        margin-top: 32px;
    }
</style>