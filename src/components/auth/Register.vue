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
            <div class="form-item_input-wrap">
                <input class="form-item_input" :type="passwordType"
                       v-model="password"
                       v-validate="'required|min:6'"
                       name="password">
                <Eye class="form-item_icon"
                     :class="{hidden:passwordType === 'password'}"
                     @click="togglePasswordVisible('passwordType')"/>
            </div>
        </div>
        <div class="form-item">
            <div class="form-item_top">
                <label class="form-item_label">Password again</label>
                <span class="form-item_error">{{ errors.first('password_again') }}</span>
            </div>
            <div class="form-item_input-wrap">
                <input class="form-item_input" :type="passwordAgainType"
                       name="password_again"
                       v-validate="'required'"
                       v-model="passwordAgain">
                <Eye class="form-item_icon"
                     :class="{hidden:passwordAgainType === 'password'}"
                     @click="togglePasswordVisible('passwordAgainType')"/>
            </div>
        </div>
        <div class="btn-big auth_btn-register" @click="register()">Register</div>
        <p class="auth_form-error">{{registerErrorMessage}}</p>
    </div>
</template>

<script>
    import Eye from '@/assets/img/eye.svg';
    import firebase from "firebase/app";
    import "firebase/auth";

    export default {
        name: 'Register',
        data: () => ({
            email: '',
            password: '',
            fullName: '',
            passwordAgain: '',
            passwordType: 'password',
            passwordAgainType: 'password',
            registerErrorMessage: ''
        }),
        components: {
            Eye
        },
        methods: {
            togglePasswordVisible(field) {
                this[field] = this[field] === 'password' ? 'text' : 'password';
            },
            register() {
                if (!this.errors.first('email')
                    && !this.errors.first('password')
                    && !this.errors.first('fullName')
                    && !this.errors.first('passwordAgain')
                ) {
                    if (this.password !== this.passwordAgain) {
                        this.registerErrorMessage = 'Password not confirmed'
                        return false;
                    }
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
                            if(error.code === 'auth/email-already-in-use') {
                                this.registerErrorMessage = 'User already exists'
                            }
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