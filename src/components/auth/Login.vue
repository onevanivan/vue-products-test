<template>
    <div class="auth_form">
        <h1 class="auth_title">Login</h1>
        <div class="form-item">
            <div class="form-item_top">
                <label class="form-item_label">Email</label>
                <span class="form-item_error">{{ errors.first('email') }}</span>
            </div>
            <input class="form-item_input"
                   v-model="email"
                   v-validate="'required|email'"
                   name="email"
                   type="text"
                   placeholder="Example@gmail.com">
        </div>
        <div class="form-item">
            <div class="form-item_top">
                <label class="form-item_label">Password</label>
                <span class="form-item_error">{{ errors.first('password') }}</span>
            </div>
            <div class="form-item_input-wrap">
                <input class="form-item_input password"
                       v-model="password"
                       v-validate="'required|min:6'"
                       name="password"
                       :type="passwordType">
                <Eye class="form-item_icon"
                     :class="{hidden:passwordType === 'password'}"
                     @click="togglePasswordVisible()"/>
            </div>
            <p class="auth_note">Don’t remember password?</p>
        </div>
        <div class="btn-big auth_btn-login" @click="login()">Continue</div>
    </div>
</template>

<script>
    import Eye from '@/assets/img/eye.svg';
    import firebase from "firebase/app";
    import "firebase/auth";

    export default {
        name: 'Login',
        components: {
            Eye
        },
        data: () => ({
            passwordType: 'text',
            email: '',
            password: ''
        }),
        methods: {
            togglePasswordVisible() {
                this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
            },
            login() {
                if (this.email
                    && !this.errors.first('email')
                    && this.password
                    && !this.errors.first('password')
                ) {
                    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                        .then((userCredential) => {
                            let data = {
                                email: userCredential.user.email,
                                authenticated: true,
                                fullName: ''
                            };
                            this.$store.commit('setUser', data);
                            this.$router.push('/home');
                        }).catch((error) => {
                        console.log(error.code)
                        console.log(error.message)
                    });
                }
            }
        }
    };
</script>