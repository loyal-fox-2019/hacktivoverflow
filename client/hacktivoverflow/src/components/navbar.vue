<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <router-link to="/">
        <b-navbar-brand>Hacktiv OverFlow</b-navbar-brand>
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
export default {
  components: {
    modalsignup,
    modalsignin
  },
  methods: {
    logout () {
      this.$store.commit('SET_LOGIN', false)
      router.push('/')
      localStorage.removeItem('token')
    }
  }
}
</script>

<style>

</style>
