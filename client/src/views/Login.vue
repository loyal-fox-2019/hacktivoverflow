<template>
  <div class="login d-flex flex-column align-items-center justify-content-center">
    <img class="logo mb-3" src="../../public/icon.png" alt="">
    <b-button class="mb-2 but-login gg" @click.prevent="googleLog">
      <i class="fab fa-google-plus-g mr-2"></i>
      Login with Google+</b-button>
    <b-button class="mb-2 but-login fb" @click.prevent="facebookLog">
      <i class="fab fa-facebook-f mr-2"></i>
      Login with Facebook</b-button>
    <b-button class="mb-4 but-login rg" @click.prevent="registerPage">Register</b-button>
    <div class="card">
      <div class="card-body">
        <b-form @submit.prevent="login">
          <b-form-group label="Email" class="label">
            <b-form-input v-model="email" type="email" required></b-form-input>
          </b-form-group>
          <b-form-group label="Password" class="label">
            <b-form-input v-model="password" type="password" required></b-form-input>
          </b-form-group>
          <b-button variant="primary" type="submit" class="but-log">Login</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    googleLog () {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Google not support'
      })
    },
    facebookLog () {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Facebook not support'
      })
    },
    registerPage () {
      this.$router.push('/signup')
    },
    login () {
      const value = {
        email: this.email,
        password: this.password
      }

      this.$store.dispatch('login', value)
        .then(({ data }) => {
          swal.fire({
            icon: 'success',
            title: `Login successfully, welcome ${data.username}`,
            showConfirmButton: false,
            timer: 1500
          })
          this.email = ''
          this.password = ''
          localStorage.setItem('token', data.token)
          this.$store.commit('SET_LOGIN', true)
          this.$router.push('/main')
        })
        .catch((err) => {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
        })
    }
  },
  created () {
    const valid = localStorage.getItem('token')
    if (valid) {
      this.$router.push('/main')
    }
  }
}
</script>

<style scoped>
.logo {
  width: 50px
}

.label {
  font-weight: bold
}

.login {
  margin-top: 78px !important;
  height: 85vh;
}

.but-log {
  font-size: 13px;
  width: 100%
}

.but-login {
  width: 270px;
  font-size: 13px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1) !important;
}

.card {
  width: 270px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1) !important;
}

.fb,
.fb:focus {
  background-color: #3268c3 !important;
  border: #3268c3 !important;
  box-shadow: none !important;
}
.fb:hover {
  background-color: #2a56a2 !important;
  border: #2a56a2 !important;
}
.gg,
.gg:focus {
  background-color: #ce1314 !important;
  border: #ce1314 !important;
  box-shadow: none !important;
}
.gg:hover {
  background-color: #a30f0f !important;
  border: #a30f0f !important;
}
.rg,
.rg:focus {
  background-color: #f48024 !important;
  border: #f48024 !important;
  box-shadow: none !important;
}
.rg:hover {
  background-color: #cb9b2d !important;
  border: #cb9b2d !important;
}
</style>
