<template>
  <div class="d-flex justify-content-center row w-100 mt-5">
    <div class="col-md-7 p-0">
      <img src="@/assets/front-logo.png">
    </div>
    <div class="col-md-5 p-0 d-flex flex-column align-items-center">
      <h4 class="my-5">HacktivOverflow</h4>
      <form v-if='showLogin' @submit.prevent='login'>
        <input v-model='user' class='form' type="text" placeholder="Username or Email">
        <input v-model='password' class='form' type="password" placeholder="Password">
        <input style="margin-top: 65px;" class='btn btn-primary' type="submit" value="Login">
        <p class="mt-3"> or <span @click='toggle'>register</span> here</p>
      </form>
      <form v-if='!showLogin' @submit.prevent='register'>
        <input v-model='username' class='form' type="text" placeholder="Username">
        <input v-model='email' class='form' type="text" placeholder="Email">
        <input v-model='password' class='form' type="password" placeholder="Password">
        <input class='btn btn-primary' type="submit" value="Register">
        <p class="mt-3"> or <span @click='toggle'>login</span> here</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {

  name: 'LandingPage',

  data () {
    return {
      showLogin: true,
      user: '',
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    toggle(){
      this.showLogin = !this.showLogin
      this.password = ''
    },
    login(){
      let payload = {
        user: this.user,
        password: this.password
      }
      this.$store.dispatch('LOGIN', payload)
    },
    register(){
      let payload = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('REGISTER', payload)
    }
  }
}
</script>

<style lang="css" scoped>
.form{
  border: none;
  border-bottom: 1px solid #428BCA;
  display: block;
  margin: 30px;
}
img{
  margin-top: auto;
  width: 100%;
}
span{
  color: #428BCA;
  cursor: pointer;
}
h4{
  font-size: 200%;
}
p{
  user-select: none;
}
</style>