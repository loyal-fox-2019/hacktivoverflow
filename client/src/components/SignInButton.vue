<template>
  <div>
      <b-button class="mx-2" variant="secondary" v-b-modal.modal-center id="loginToggle" right>Login</b-button>
      <b-modal
      id="modal-center"
      centered
      title="HacktivOverflow"
      hide-footer
      header-bg-variant="primary"
      size="lg"
      >
        <b-row>
            <b-col style="border-right: black solid 1px;">
                <center>
                <h3>Login</h3>
                </center>
                <b-form>
                <b-form-group
                    id="loginEmailGroup"
                    label="Email address:"
                    label-for="loginEmail"
                >
                    <b-form-input
                    id="loginEmail"
                    type="email"
                    v-model="loginForm.email"
                    required
                    placeholder="Enter email"
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                    id="loginPasswordGroup"
                    label="Password:"
                    label-for="loginPassword"
                >
                    <b-form-input
                    id="loginPassword"
                    type="password"
                    v-model="loginForm.password"
                    required
                    placeholder="Enter password"
                    ></b-form-input>
                </b-form-group>
                <b-button variant="primary" @click="webLogin"> Login </b-button>
                </b-form>
            </b-col>
            <b-col style="border-left: black solid 1px;">
                <center>
                <h3>Register</h3>
                </center>
                <b-form>
                    <b-form-group
                    id="registerUsernameGroup"
                    label="Username:"
                    label-for="registerUserName"
                >
                    <b-form-input
                    id="registerUserName"
                    type="text"
                    v-model="registerForm.userName"
                    required
                    placeholder="Enter username"
                    ></b-form-input>
                </b-form-group>
                    <b-form-group
                    id="registerEmailGroup"
                    label="Email address:"
                    label-for="registerEmail"
                >
                    <b-form-input
                    id="registerEmail"
                    type="email"
                    v-model="registerForm.email"
                    required
                    placeholder="Enter email"
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                    id="registerPasswordGroup"
                    label="Password:"
                    label-for="registerPassword"
                >
                    <b-form-input
                    id="registerPassword"
                    type="password"
                    v-model="registerForm.password"
                    required
                    placeholder="Enter password"
                    ></b-form-input>
                </b-form-group>
                <b-button variant="primary" @click="webRegister"> Register </b-button>
                </b-form>
            </b-col>
        </b-row>
      </b-modal>
  </div>
</template>

<script>
export default {
  name: 'SignInButton',
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        userName: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    webRegister () {
      this.$store.dispatch('webRegister', { userName: this.registerForm.userName, email: this.registerForm.email, password: this.registerForm.password })
    },
    webLogin () {
      this.$store.dispatch('webLogin', { email: this.loginForm.email, password: this.loginForm.password })
    }
  }
}
</script>

<style>

</style>
