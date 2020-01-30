<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <router-link to="/">
        <b-navbar-brand>
          <img src="../assets/logo.png" id="logo" alt="">
          Hacktiv OverFlow
          </b-navbar-brand>
      </router-link>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
            <b-nav-item-dropdown right v-if="$store.state.login">
            <template v-slot:button-content>
                <em>User</em>
            </template>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown right v-else>
            <template v-slot:button-content>
                <em>account</em>
            </template>
            <b-dropdown-item v-b-modal.modal-2>SignIn</b-dropdown-item>
            <b-dropdown-item v-b-modal.modal-1>SignUp</b-dropdown-item>
            <b-dropdown-item>
                <g-signin-button
                  :params="googleSignInParams"
                  @success="onSignInSuccess"
                  @error="onSignInError">
                  Sign in with Google
              </g-signin-button>
            </b-dropdown-item>
            <modalsignup></modalsignup>
            <modalsignin></modalsignin>
            </b-nav-item-dropdown>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import modalsignup from './modalsignup'
import modalsignin from './modalsignin'
import router from '../router/index'
import axios from 'axios'
export default {
  data () {
    return {
      googleSignInParams: {
        client_id: '863009554428-l54nr1bbp4iq85fsvc592rr5u5u2thgi.apps.googleusercontent.com'
      }

    }
  },
  components: {
    modalsignup,
    modalsignin
  },
  methods: {
    logout () {
      this.$store.commit('SET_LOGIN', false)
      router.push('/')
      localStorage.removeItem('token')
    },
    onSignInSuccess (googleUser) {
      const idToken = googleUser.getAuthResponse().id_token
      axios({
        url: 'http://localhost:3000/users/google',
        method: 'POST',
        data: { idToken }
      })
        .then((data) => {
          localStorage.setItem('token', data.data.token)
          this.$store.commit('SET_LOGIN', true)
        })
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    }
  }
}
</script>

<style>
#logo{
  width: 30px;
}

</style>
