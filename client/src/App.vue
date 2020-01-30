<template>
  <div>
    <Navbar />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: { Navbar },
  created() {
    if (localStorage.getItem('token')) {
      this.$store.commit('UPDATE_USER_DATA', {
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username'),
        email: localStorage.getItem('email'),
        avatar: localStorage.getItem('avatar'),
      })
    }
  },
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0.3;
}
</style>
