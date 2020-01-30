<template>
  <div>
  <b-navbar toggleable="lg" type="light" variant="light" class="shadow" fixed="top">
    <router-link to="/"><b-navbar-brand>HacktivOverFlow</b-navbar-brand></router-link>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
        <SignInButton v-if="!$store.state.isLogin"></SignInButton>
        <b-nav-item-dropdown right v-if="$store.state.isLogin">
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content >
            <em>{{$store.state.userName}}</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#" @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import SignInButton from './SignInButton'
export default {
  name: 'NavBar',
  components: {
    SignInButton
  },
  methods: {
    logout () {
      this.$store.commit('SET_LOGOUT')
    }
  }
}
</script>

<style>

</style>
