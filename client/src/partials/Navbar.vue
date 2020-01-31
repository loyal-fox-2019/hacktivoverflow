<template>
  <div class="flex justify-between">
    <q-tabs align="left">
      <q-route-tab to="/" label="Home" />
      <q-route-tab to="/my-questions" label="My Questions" v-if="isLogin" />
      <q-route-tab to="/my-answers" label="My Answers" v-if="isLogin" />
    </q-tabs>

    <q-tabs class="q-mr-sm" align="center" v-if="!isLogin">
      <q-btn
        color="grey-4"
        text-color="purple"
        glossy
        unelevated
        to="/login"
        label="Login"
      />
    </q-tabs>

    <q-tabs class="q-mr-sm" align="center" v-else>
      <div class="q-pa-md">
        <q-btn-dropdown color="secondary" :label="username">
          <q-list>
            <q-item clickable v-close-popup @click="logout">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </q-tabs>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    isLogin() {
      return this.$store.state.isLogin
    },
    username() {
      return localStorage.username
    }
  },
  methods: {
    logout() {
      if (localStorage.getItem('platform') === 'google') {
        // eslint-disable-next-line
        const auth2 = gapi.auth2.getAuthInstance()
        auth2.signOut().then(function() {
          console.log('User signed out.')
        })
      }
      localStorage.removeItem('token')
      localStorage.removeItem('platform')
      localStorage.removeItem('username')
      this.$router.push('/')
      this.$store.state.isLogin = false
    }
  }
}
</script>

<style></style>
