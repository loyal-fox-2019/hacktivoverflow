<template>
  <div class="q-pa-md q-mx-auto window-height" style="max-width: 50%;">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-mt-xl q-pa-lg bg-white"
    >
      <h4 class="text-center">Login</h4>
      <q-separator class="q-my-sm" color="orange" inset />
      <q-input
        filled
        label="Email"
        lazy-rules
        v-model="email"
        :rules="[(val) => (val && val.length > 0) || 'Email is required']"
      />

      <q-input
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        label="Password"
        :rules="[(val) => (val && val.length > 0) || 'Password is required']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div class="flex justify-center">
        <q-btn label="Login" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
      <div class="q-mt-lg text-right">
        Dont Have an Account?
        <router-link class="" to="/register">Register Here</router-link>
      </div>
    </q-form>

    <div class="flex justify-center q-mt-md">
      <g-signin-button
        :params="googleSignInParams"
        @success="onSignInSuccess"
        @error="onSignInError"
      >
        Sign in with
        <i class="fab fa-google q-mx-sm"></i>
        Google
      </g-signin-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      accept: false,
      isPwd: true,
      googleSignInParams: {
        client_id:
          '650908614493-rjcv6g0ll6thkdhrnl0dp3oqljelptrc.apps.googleusercontent.com'
      }
    }
  },

  methods: {
    onSubmit() {
      axios({
        method: 'post',
        url: 'http://3.1.84.218:3000/user/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.username)
          localStorage.setItem('platform', data.platform)
          localStorage.setItem('id', data.id)
          this.$store.state.isLogin = true
          this.$router.replace('/home')
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Login Success'
          })
        })
        // eslint-disable-next-line
        .catch((err) => {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Wrong email or password'
          })
        })
    },

    onReset() {
      this.email = null
      this.password = null
    },
    onSignInSuccess(googleUser) {
      const idToken = googleUser.getAuthResponse().id_token
      const token = {
        idToken: idToken
      }
      axios
        .post('http://3.1.84.218:3000/user/g-sign-in', token)
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('platform', data.platform)
          localStorage.setItem('username', data.username)
          localStorage.setItem('id', data.id)
          this.$store.state.isLoggedIn = true
          this.$router.replace('/')
        })
        // eslint-disable-next-line
        .catch(function(error) {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Something went wrong'
          })
        })
    },
    // eslint-disable-next-line
    onSignInError(error) {
      this.$q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: 'Something went wrong'
      })
    }
  }
}
</script>

<style scoped>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 1vh 1rem;
  border-radius: 1vw;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}

.g-signin-button:hover {
  background-color: green;
}

.g-signin-button:active {
  background-color: blue;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
</style>
