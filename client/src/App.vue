<template>
  <div id="app">
    <div id="nav" class="flex w-full bg bg-gray-200 border-b-2 border-gray-300 border-t-2 h-16">
      <router-link to="/" class="my-auto ml-3"><img class="h-10" src="https://www.iconsdb.com/icons/preview/dim-gray/stackoverflow-3-xxl.png" alt=""></router-link>
      <div class="trans border w-24 absolute top-0 right-0 rounded text-center text-gray-700 uppercase font-bold mr-6 mt-4 hover:bg-gray-600 cursor-pointer hover:text-white hover:shadow-lg" v-if="isLogin" @click="logout">logout</div>
      <!-- <img class="trans h-10 rounded-full absolute right-0 mr-32 mt-3 cursor-pointer hover:shadow-lg" src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  created() {
    if(localStorage.getItem('token')) {
      this.$router.push({path:'/'})
      this.$store.commit('SET_LOGIN_TRUE')
      this.$store.dispatch('getUser')
    } else {
      this.$router.push({path:'/auth'})
    }
  },
  computed: {
    ...mapState(['isLogin','success','fail','successMessage','failMessage'])
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$store.commit('SET_LOGIN_FALSE')
      this.$router.push({path:'/auth'})
    }
  },
  watch: {
    'success': function(v) {
      if(v) {
        this.$swal.fire({
          icon: 'success',
          title: this.successMessage,
          showConfirmButton: false,
          timer: 1500
        })
      }
    },
    'fail': function(v) {
      if(v) {
        this.$swal.fire({
          icon: 'error',
          title: this.failMessage,
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }
}
</script>

<style>
.trans:hover {
  transition: 500ms;
}

.trans {
  transition: 500ms;
}

.trans:focus {
  transition: 500ms;
}
input::-webkit-input-placeholder {
    font-size: 12px;
    line-height: 3;
}
</style>
