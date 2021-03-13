<template>
    <div class="auth_form">
        <h1 class="auth_title">Register</h1>
        <div class="form-item">
            <label class="form-item_label">Email</label>
            <input class="form-item_input" type="text"
                   v-model="email"
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
            <input class="form-item_input" type="text"
                   v-model="password"
                   name="password">
        </div>
        <div class="form-item">
            <label class="form-item_label">Password again</label>
            <input class="form-item_input" type="text" name="password_again">
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
        created() {
            const firebaseConfig = {
                apiKey: "AIzaSyAhSuYHoKZ_4pVKChEmmD8cUPzMwvqTTTU",
                authDomain: "avada-media-test.firebaseapp.com",
                databaseURL: "https://avada-media-test-default-rtdb.firebaseio.com",
                projectId: "avada-media-test",
                storageBucket: "avada-media-test.appspot.com",
                messagingSenderId: "332658269283",
                appId: "1:332658269283:web:9ea36ce2d38c49e863ac56"
            };
            firebase.initializeApp(firebaseConfig);
        },
        methods: {
            register() {
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then((userCredential) => {
                        // Signed in
                        let user = userCredential.user;
                        console.log(user)
                    })
                    .catch((error) => {
                        console.log(error.code)
                        console.log(error.message)
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