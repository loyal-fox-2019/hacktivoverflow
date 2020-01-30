<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />

              </v-toolbar>
              <v-card-text>
                <v-alert type="error" v-for="(error, i) in errors" :key="i">
                  {{error}}
                </v-alert>
                <v-form id="login-form" @submit.prevent="login">
                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-account"
                    type="email"
                    v-model="email"
                    required
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                    required
                  />
                  <div class="registration text-center">
                    Don't have an account yet?
                    <a @click="toRegister">Create an account.</a>
                  </div>
                  <div class="registration text-center">
                    <p>Or login with different account,</p>
                    <v-btn color="white" @click="signGoogle"> <v-icon class="mr-2">mdi-google</v-icon>Google</v-btn>
                  </div>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="green" @click="toHome">Home</v-btn>
                <v-spacer />
                <v-btn color="primary" type="submit" form="login-form">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from '../config/api'
export default {
  props: {
    source: String
  },
  data () {
    return {
      email: '',
      password: '',
      errors: []
    }
  },
  methods: {
    signGoogle () {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          return axios({
            method: 'post',
            url: '/google',
            data: { idToken: GoogleUser.getAuthResponse().id_token }
          })
          // this.isSignIn = this.$gAuth.isAuthorized
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.username)
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: 'Login success',
            showConfirmButton: false,
            timer: 1500
          })
          this.$store.commit('SET_LOGIN')
          this.$store.dispatch('fetchUser')
          this.$router.push('/')
        })
        .catch(() => {
          this.errors.push('Google OAuth Failed')
        })
    },
    toHome () {
      this.$router.push('/')
    },
    toRegister () {
      this.$router.push('register')
    },
    login () {
      this.errors = []
      axios({
        method: 'POST',
        url: `/login`,
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.username)
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: 'Login success',
            showConfirmButton: false,
            timer: 1500
          })
          this.password = ''
          this.email = ''
          this.$store.commit('SET_LOGIN')
          this.$store.dispatch('fetchUser')
          this.$router.push('/')
        })
        .catch(err => {
          this.errors.push(err.response.data.message)
        })
    }
  }
}
</script>
