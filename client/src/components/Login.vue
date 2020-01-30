<template>
  <div class="login">
    <div class="container">
      <!-- row login form -->
      <div class="row justify-content-center mt-5">
        <div class="col-4">
          <div class="icon">
            <img src="../assets/so-icon.png" width="64" alt="icon">
          </div>
          <div class="form p-4 shadow rounded" @submit.prevent="login">
            <form>
              <div class="form-group">
                <label>Email</label>
                <input class="form-control" v-model="email" placeholder="Enter your email">
              </div>
              <div class="form-group">
                <label>Password</label>
                <input class="form-control" type="password" v-model="password" placeholder="Enter your password">
              </div>
              <button type="submit" class="btn btn-primary btn-block">Log in</button>
            </form>
          </div>
          <div class="hyperlink-sign-up">
            <router-link to="/register">
              <p>Don't have an account?<span class="link"> Sign up</span></p>
            </router-link>
          </div>
        </div>
      </div>
      <!-- end row login form -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data(){
    return{
      email: '',
      password: ''
    }
  },
  methods: {
    login(){
       axios({
            url: `http://18.136.105.19:3000/users/login`,
            method: 'post',
            data:{
              email: this.email,
              password: this.password
            }
            })
            .then(({data})=>{
                this.email = ''
                this.password = ''
                localStorage.setItem('token',data.token)
                localStorage.setItem('user',data.user.username)
                this.$store.commit('setUser',data.user.username)      
                this.$store.commit('setTags',data.user.tags)                
                this.$router.push('/')
                this.$store.commit('setLogin',true)
            })
            .catch(err=>{
                console.log(err)
            })
    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon {
  text-align: center;
  margin-bottom: .5rem
}
label {
  font-weight: 700;
}
.btn-primary {
  background-color: #0095ff;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.4);
}
.btn {
  padding: .6rem;
  border: 1pz solid transparent;
}
.hyperlink-sign-up {
  text-align: center;
  margin-top: 3rem;
}
.hyperlink-sign-up .link {
  color: #0064bd;
  cursor: pointer;
}
.link:hover {
  text-decoration: none;
  color: #0095ff;
}
</style>
