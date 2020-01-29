<template>
  <div class="sign-up">
    <div class="container">
      <!-- row sign up form -->
      <div class="row justify-content-center mt-5">
          <div class="col-4">
            <div class="icon">
                <img src="../assets/so-icon.png" width="64" alt="icon">
            </div>
            <div class="form p-4 shadow rounded">
                <form @submit.prevent="register">
                    <div class="form-group">
                        <label>Username</label>
                        <input v-model="username" class="form-control" placeholder="Enter your username">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input v-model="email" type="email" class="form-control" placeholder="Enter your email">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input v-model="password" type="password" class="form-control" placeholder="Enter your password">
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Sign up</button>
                </form>
                <p class="small tnc">By clicking "Sign up" you agree to our terms of service, privacy policy and cookie policy</p>
            </div>
            <div class="hyperlink-sign-up">
              <router-link to="/login">
                <p>Already have an account?<span class="link"> Log in</span></p>
              </router-link>
            </div>
          </div>
      </div>
      <!-- end row sign up form -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SignUp',
  data(){
    return{
      username:'',
      email:'',
      password:''
    }
  },
  methods:{
      register(){
          axios({
            url: `http://localhost:3000/users/register`,
            method: 'post',
            data:{
              username: this.username,
              email: this.email,
              password: this.password
            }
            })
            .then(({data})=>{
                this.username = ''
                this.email = ''
                this.password = ''
                localStorage.setItem('token',data.token)
                localStorage.setItem('user',data.user.username)
                this.$store.commit('setUser',data.user.username)
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
.tnc {
  color: #61737c;
  margin-top: 1rem;
}
</style>
