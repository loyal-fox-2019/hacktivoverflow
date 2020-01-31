<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="orange" dark flat>
                <v-toolbar-title v-show="register"
                  >Register form</v-toolbar-title
                >
                <v-toolbar-title v-show="!register">Login form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Name"
                    name="name"
                    prepend-icon="person"
                    type="text"
                    v-show="register"
                    v-model="name"
                  />

                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mail"
                    type="email"
                    v-model="email"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="orange"
                  style="color: white"
                  v-show="register"
                  @click.prevent="createAccount"
                  >Register</v-btn
                >
                <v-btn
                  color="orange"
                  style="color: white"
                  v-show="!register"
                  @click.prevent="login"
                  >Login</v-btn
                >
              </v-card-actions>
              <v-card-text>
                <h3 v-show="register">
                  or Already have an account?
                  <a href="#" @click.prevent="change">Click here</a>
                </h3>
                <h3 v-show="!register">
                  Dont have an account?
                  <a href="#" @click.prevent="change">Register here</a>
                </h3>
                <g-signin-button
                  id="gSign"
                  :params="googleSignInParams"
                  @success="onSignInSuccess"
                  @error="onSignInError"
                >
                  Sign in with Google
                </g-signin-button>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'defaultForm',
  data() {
    return {
      register: false,
      name: '',
      email: '',
      password: '',
      googleSignInParams: {
        client_id:
          '2425414127-fjk95e6eoncr511u292486qh9h28pkg8.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    change() {
      this.register = !this.register
    },
    login() {
      const form = {
        email: this.email,
        password: this.password
      }
      axios
        .post(`${this.$store.state.baseUrl}/user/login`, form)
        .then(result => {
          localStorage.setItem('token', result.data.token)
          localStorage.setItem('id', result.data.id)
          this.$router.push('/')
          this.$store.commit('CHANGE_LOGIN', result.data.id)
          Swal.fire('Success', 'Login Success', 'success')
        })
        .catch(err => {
          this.email = ''
          this.password = ''
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: err.response.status + ' | ' + err.response.data.message
          })
        })
    },
    createAccount() {
      const form = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      axios
        .post(`${this.$store.state.baseUrl}/user/register`, form)
        .then(result => {
          localStorage.setItem('token', result.data.token)
          localStorage.setItem('id', result.data.id)
          this.$router.push('/')
          this.$store.commit('CHANGE_LOGIN', result.data.id)
          Swal.fire('Success', 'Registration Success', 'success')
        })
        .catch(err => {
          this.name = ''
          this.email = ''
          this.password = ''
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: err.status + err.statusText
          })
        })
    },
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      // const profile = googleUser.getBasicProfile() // etc etc
      const idToken = googleUser.getAuthResponse().id_token
      axios
        .post(`${this.$store.state.baseUrl}/user/google`, {
          idToken: idToken
        })
        .then(result => {
          localStorage.setItem('token', result.data.token)
          localStorage.setItem('id', result.data.id)
          this.$router.push('/')
          this.$store.commit('CHANGE_LOGIN', result.data.id)
          Swal.fire('Success', 'Google Sign In Success', 'success')
        })
        .catch(err => {
          this.name = ''
          this.email = ''
          this.password = ''
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: err.response.status + err.response.statusText
          })
        })
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error
      })
    }
  }
}
</script>

<style lang="css">
h3 a:hover {
  color: black;
}
#gSign {
  background-color: blue;
  border-radius: 10px;
  text-align: center;
  color: white;
  font-weight: 500;
  font-size: 20px;
  margin-top: 5px;
  padding: 5px;
  cursor: pointer;
}
#gSign:hover {
  background-color: orange;
}
</style>
