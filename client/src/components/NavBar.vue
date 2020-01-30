<template>
  <b-container>
    <b-row>
      <b-col>
        <div class="navigation">
          <div class="left">
            <a href="#"><b-icon icon="plus"></b-icon>ASK QUESTIONS</a>
          </div>
          <div class="right">
            <router-link class="mr-2" to="/">HOME</router-link>
            <router-link class="mr-2" v-if="!isLogin" to="/login">LOGIN</router-link>
            <router-link v-if="!isLogin" to="/register">REGISTER</router-link>
            <a href="#" v-if="isLogin" @click.prevent="logout">LOGOUT</a>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('CHECK_LOGIN')
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style>
  .navigation {
    height: 4rem;
    display: flex;
    padding: 2rem;
    justify-content: space-between;
    align-items: center;
    background-color: #45454d;
  }
</style>
