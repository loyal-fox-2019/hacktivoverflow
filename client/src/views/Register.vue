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
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer />

              </v-toolbar>
              <v-card-text>
                <v-alert type="error" v-for="(error, i) in errors" :key="i">
                  {{error}}
                </v-alert>
                <v-form id="register-form" @submit.prevent="register">
                  <v-text-field
                    label="Username"
                    name="username"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="email"
                    required
                  />
                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-email"
                    type="email"
                    v-model="email"
                    required
                  />
                  <v-file-input
                    required
                    label="Foto"
                    filled
                    prepend-icon="mdi-camera"
                    v-model="profile_pic"
                  ></v-file-input>
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                    required
                  />
                  <v-text-field
                    id="retype"
                    label="Retype Password"
                    name="retype"
                    prepend-icon="mdi-lock"
                    type="retype"
                    v-model="retype"
                    required
                  />
                  <v-checkbox
                    v-model="checkbox"
                    label="Agree to our Term of Services"
                  ></v-checkbox>
                  <div class="registration text-center">
                    Already have an account?
                    <a @click="toLogin">Login</a>
                  </div>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" type="submit" form="register-form">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// import axios from '../config/api'
export default {
  props: {
    source: String
  },
  data () {
    return {
      email: '',
      password: '',
      retype: '',
      profile_pic: null,
      checkbox: true,
      errors: []
    }
  },
  methods: {
    toLogin () {
      this.$router.push('login')
    },
    register () {
      this.$router.push('/')
      // axios({
      //   method: 'post',
      //   // url: '/auth/register',
      //   data: {
      //     email: this.email,
      //     password: this.password
      //   }
      // })
      //   .then(({ data }) => {
      //     // this.email = ''
      //     // this.password = ''
      //     // this.$router.push('login')
      //   })
      //   .catch(err => {
      //     this.errors = err.response.data.errors
      //   })
    }
  }
}
</script>
