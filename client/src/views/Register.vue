<template>
  <div class="register d-flex flex-column align-items-center justify-content-center">
    <div class="row">
      <div class="col mr-4">
        <div class="mt-4">
        <h4>Join the Stack Overflow community</h4>
        <div class="row mb-3 mt-3">
          <div class="col-1">
            <i class="fas fa-question"></i>
          </div>
          <div class="col">
            Get unstuck — ask a question
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-1">
            <i class="fas fa-sort"></i>
          </div>
          <div class="col">
            Unlock new privileges like voting and commenting
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-1">
            <i class="fas fa-tags"></i>
          </div>
          <div class="col">
            Save your favorite tags, filters, and jobs
          </div>
        </div>
        <div class="row">
          <div class="col-1">
            <i class="fas fa-trophy"></i>
          </div>
          <div class="col">
            Earn reputation and badges
          </div>
        </div>
        </div>
      </div>
      <div class="col">
        <div class="card mt-4 mb-4">
          <div class="card-body">
            <b-form @submit.prevent="signup">
              <b-form-group label="Display Name" class="label">
                <b-form-input v-model="username" type="text" required></b-form-input>
              </b-form-group>
              <b-form-group label="Email" class="label">
                <b-form-input v-model="email" type="email" required></b-form-input>
              </b-form-group>
              <b-form-group label="Password" class="label">
                <b-form-input v-model="password" type="password" required></b-form-input>
              </b-form-group>
              <b-button variant="primary" type="submit" class="but-log">Sign up</b-button>
            </b-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2'

export default {
  name: 'SignUp',
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signup () {
      const value = {
        email: this.email,
        password: this.password,
        username: this.username
      }
      this.$store.dispatch('register', value)
        .then(({ data }) => {
          swal.fire({
            icon: 'success',
            title: `Register successfuly, Welcome ${data.username}`,
            showConfirmButton: false,
            timer: 1500
          })
          this.email = ''
          this.password = ''
          this.username = ''
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

.fas {
  color:  #0196ff;
}

.register {
  margin-top: 78px !important;
  height: 85vh
}
.col {
  width: 350px !important
}

.label {
  font-weight: bold
}

.card {
  width: 270px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1) !important;
}

.but-log {
  font-size: 13px;
  width: 100%
}
</style>
