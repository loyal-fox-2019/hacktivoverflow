<template>
  <div class="container-fluid latar">
    <div class="row align-items-center" style="height:100vh">
      <div class="col-4 mx-auto">
        <!-- LOGIN PAGE -->
        <div v-show="loginPage" class="jumbotron transparan pb-4 pt-4">
          <h2 class="text-center mb-4 mt-0">
            Login
          </h2>
          <form>
            <div class="form-group">
              <input
                v-model="login.email"
                class="w3-input"
                type="email"
                style="background-color: rgba(126, 119, 119, 0);"
              />
              <label for="exampleInputEmail1">Email address</label>
            </div>
            <div class="form-group">
              <input
                v-model="login.password"
                class="w3-input"
                type="password"
                style="background-color: rgba(126, 119, 119, 0);"
              />
              <label for="exampleInputPassword1">Password</label>
            </div>
            <div class="d-flex justify-content-center">
              <button
                @click="masuk"
                type="button"
                class="btn btn-secondary"
                style="font-size: 17px;"
              >
                Login
              </button>
            </div>
            <p
              @click.prevent="hideLogin"
              class="d-flex justify-content-center mt-3"
              style="cursor:pointer"
            >
              Dont have any account, click to sign up?
            </p>
          </form>
        </div>

        <!-- REGISTER PAGE -->
        <div class="jumbotron transparan pb-4 pt-4" v-show="registerPage">
          <h2 class="text-center mb-4 mt-0">
            Register
          </h2>
          <form>
            <div class="form-group">
              <input
                v-model="register.name"
                class="w3-input"
                type="text"
                style="background-color: rgba(126, 119, 119, 0);"
              />
              <label for="exampleInputEmail1">Username</label>
            </div>
            <div class="form-group">
              <input
                v-model="register.email"
                class="w3-input"
                type="email"
                style="background-color: rgba(126, 119, 119, 0);"
              />
              <label for="exampleInputEmail1">Email address</label>
            </div>
            <div class="form-group">
              <input
                v-model="register.password"
                class="w3-input"
                type="password"
                style="background-color: rgba(126, 119, 119, 0);"
              />
              <label for="exampleInputPassword1">Password</label>
            </div>
            <div class="d-flex justify-content-center">
              <button
                @click="daftar"
                type="button"
                class="btn btn-secondary"
                style="font-size: 17px;"
              >
                Register
              </button>
            </div>
            <p
              @click.prevent="showLogin"
              class="d-flex justify-content-center mt-3"
              style="cursor:pointer"
            >
              Already have an account?
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'RegisterLogin',
  data() {
    return {
      loginPage: false,
      registerPage: true,
      login: {
        email: '',
        password: ''
      },
      register: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapMutations(['SET_USERLOGIN', 'HIDE_LOGINPAGE']),
    ...mapActions(['signOut', 'getAllUser', 'getAllContent', 'getUserContent']),
    showLogin() {
      this.loginPage = true
      this.registerPage = false
      this.register.email = ''
      this.register.password = ''
    },
    hideLogin() {
      this.loginPage = false
      this.registerPage = true
      this.login.email = ''
      this.login.password = ''
    },
    masuk() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/login',
        data: this.login
      })
        .then(({ data }) => {
          console.log(data.token)
          localStorage.setItem('token', data.token)
          this.getAllContent()
          this.getAllUser()
          this.getUserContent()
          this.HIDE_LOGINPAGE()
        })
        .catch(err => {
          console.log(err)
        })
    },
    daftar() {
      axios({
        method: 'post',
        url: `http://localhost:3000/users/register`,
        data: this.register
      })
        .then(({ data }) => {
          console.log('berhasil register')
          console.log(data)
          this.showLogin()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.latar {
  background: url('https://wallpaperaccess.com/full/346667.jpg');
}
.transparan {
  background-color: rgba(126, 119, 119, 0.4);
  color: aliceblue;
  border-radius: 25px;
}
input[type='text'] {
  border: none;
  border-bottom: 2px solid rgb(241, 238, 238);
  background-color: rgba(126, 119, 119, 0.4);
}
</style>
