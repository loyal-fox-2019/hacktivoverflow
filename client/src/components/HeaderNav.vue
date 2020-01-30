<template>
  <div>
    <v-app-bar app color="orange" dark>
      <v-toolbar-title
        style="font-weight: 600; cursor: pointer;"
        @click.prevent="homePage"
        >HacktivOverflow</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn
        class="ma-2"
        id="btn"
        outlined
        color="white"
        style="color: white;"
        @click.prevent="myQuestion"
        v-show="isLogin"
        >My Questions</v-btn
      >
      <v-btn
        class="ma-2"
        id="btn"
        outlined
        color="white"
        style="color: white;"
        @click.prevent="changePage"
        v-show="!isLogin"
        >Login Or Register</v-btn
      >
      <div class="pa-2" v-show="isLogin">
        <v-btn
          block
          color="white"
          style="color: orange;"
          @click.prevent="logout"
          >Logout</v-btn
        >
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  props: {
    source: String
  },
  data() {
    return {}
  },
  methods: {
    logout() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout'
      }).then(result => {
        if (result.value) {
          localStorage.removeItem('token')
          this.$store.commit('LOGOUT')
          Swal.fire('Logout Success', 'Thank you!', 'success')
        }
      })
    },
    homePage() {
      this.$store.commit('DETAIL_QUESTION', null)
      this.$router.push('/')
    },
    changePage() {
      this.$router.push('/login')
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style lang="css">
#btn:hover {
  background-color: white;
  color: orange !important;
}
</style>
