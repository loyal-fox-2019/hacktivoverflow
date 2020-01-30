<template>
  <q-layout view="hHh lpr fFf">
    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title @click="pindah">
          <q-avatar>
            <img src="../assets/logo.png" />
          </q-avatar>
          Hacktiv Overflow
        </q-toolbar-title>
      </q-toolbar>
      <!-- Navbar -->
      <Navbar />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          Hacktiv Overflow | Muhammad Fajri
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import Navbar from '../partials/Navbar'
export default {
  name: 'Home',
  components: {
    Navbar
  },
  data() {
    return {
      isLogin: this.$store.state.isLogin
    }
  },
  methods: {
    pindah() {
      if (this.$router.currentRoute.path !== '/home') {
        this.$router.push('/home')
      }
    }
  }
}
</script>
