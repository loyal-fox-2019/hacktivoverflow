<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>{{sign}} form</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-if="sign !== 'Login'"
                  label="email"
                  name="email"
                  type="email"
                  required
                  v-model="email"
                  :rules="rules"
                  hide-details="auto"
                />

                <v-text-field
                  :label="labeled"
                  :name="labeled"
                  type="text"
                  required
                  v-model="name"
                  :rules="rules"
                  hide-details="auto"
                />

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  required
                  v-model="password"
                  auto-complete="off"
                  :rules="rules"
                  hide-details="auto"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                type="submit"
                v-if="sign === 'Login'"
                @click.prevent="goLogin"
              >{{sign}}</v-btn>
              <v-btn color="primary" v-else type="submit" @click.prevent="goRegister">{{sign}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'FormulirSign',
  props: ['sign'],
  data () {
    return {
      name: '',
      email: '',
      password: '',
      rules: [value => !!value || 'Required.']
    }
  },
  computed: {
    labeled () {
      if (this.sign === 'Login') return 'email atau username'
      else return 'username'
    }
  },
  methods: {
    goLogin () {
      console.log('masuk loogin')
      this.axios({
        method: 'POST',
        url: 'users/login',
        data: {
          input: this.name,
          password: this.password
        }
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('token', data)
          this.$store.state.isLogin = true
          this.$store.commit('SET_ALERT', {
            message: 'Success login',
            variant: 'success'
          })
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err.response.data.message)
          this.$store.commit('SET_ALERT', {
            message: err.response.data.message,
            variant: 'danger'
          })
        })
    },
    goRegister () {
      console.log('masuk register')
      this.axios({
        method: 'POST',
        url: 'users/register',
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data)
          this.$store.state.isLogin = true
          this.$store.commit('SET_ALERT', {
            message: 'Success register',
            variant: 'success'
          })
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err.response.data)
          this.$store.commit('SET_ALERT', {
            message: err.response.data.message[0],
            variant: 'danger'
          })
          // console.log(err.response.data.message)
        })
    }
  }
}
</script>

<style>
</style>
