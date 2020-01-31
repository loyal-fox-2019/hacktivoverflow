<template>
  <div class="q-pa-md q-mx-auto window-height" style="max-width: 50%;">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-mt-xl q-pa-lg bg-white"
    >
      <h4 class="text-center">Register</h4>
      <q-separator class="q-my-sm" color="orange" inset />

      <q-input
        filled
        label="Username"
        type="text"
        lazy-rules
        v-model="username"
        :rules="[(val) => (val && val.length > 0) || 'Username is required']"
      />

      <q-input
        filled
        label="Email"
        type="email"
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
        <q-btn label="Register" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>

      <div class="q-mt-lg text-right">
        Already have an Account?
        <router-link class="" to="/login">Login Here</router-link>
      </div>
    </q-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Register',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      isPwd: true
    }
  },

  methods: {
    onSubmit() {
      axios({
        method: 'post',
        url: 'http://3.1.84.218:3000/user/register',
        data: {
          username: this.username,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          if (data.name === 'MongoError') {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'Username or email are already taken'
            })
          } else {
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            localStorage.setItem('platform', data.platform)
            localStorage.setItem('id', data.id)
            this.$store.state.isLogin = true
            this.$router.replace('/')
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Register Success'
            })
          }
        })
        .catch((err) => {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Something went wrong'
          })
        })
    },

    onReset() {
      this.username = null
      this.email = null
      this.password = null
    }
  }
}
</script>

<style></style>
