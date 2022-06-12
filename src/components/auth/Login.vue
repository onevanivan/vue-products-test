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
               :type="passwordType"
               @keyup.enter.stop="login">
        <Eye class="form-item_icon"
             :class="{hidden:passwordType === 'password'}"
             @click="togglePasswordVisible()"/>
      </div>
    </div>
    <div class="btn-big auth_btn-login" @click="login()">Continue</div>
    <p class="auth_form-error">{{ loginErrorMessage }}</p>
  </div>
</template>

<script>
import Eye from '@/assets/img/eye.svg';
import firebase from "firebase/app";

export default {
  name: 'Login',
  components: {
    Eye
  },
  data: () => ({
    passwordType: 'password',
    email: '',
    password: '',
    loginErrorMessage: ''
  }),
  methods: {
    togglePasswordVisible() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    },
    login() {
      if (this.errors.first('email') || this.errors.first('password')) {
        return;
      }
      this.$store.commit('setLoading', true);
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then((databaseUser) => {
            let user = {
              id: databaseUser.user.uid,
              email: databaseUser.user.email,
            };
            firebase.database().ref().child(`users/${databaseUser.user.uid}`).get()
                .then((snapshotUser) => {
                  let data = snapshotUser.val();
                  user.fullName = data.fullName;
                  this.$store.commit('setUser', user);
                  this.$store.commit('setAuth', true);
                  this.$store.commit('setLoading', false);
                  this.$router.replace({name: 'home'});
                });
          }).catch((error) => {
        this.$store.commit('setLoading', false);
        if (error.code === 'auth/user-not-found') {
          this.loginErrorMessage = 'User not found';
        }
        if (error.code === 'auth/wrong-password') {
          this.loginErrorMessage = 'Wrong password';
        }
      });
    }
  }
};
</script>