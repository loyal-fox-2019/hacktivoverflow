<template>
    <b-modal id="modal-1" title="Create Account" hide-footer ref="my-modal">
        <b-form @submit.prevent="signup">
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="input-1"
                type="email"
                required
                placeholder="Enter email"
                v-model="email"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-2" label="First Name:" label-for="input-2">
              <b-form-input
                id="input-2"
                type="text"
                required
                placeholder="Enter First Name"
                v-model="firstName"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-3" label="Last Name:" label-for="input-3">
              <b-form-input
                id="input-3"
                type="text"
                required
                placeholder="Enter Last Name"
                v-model="lastName"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-5" label="Password:" label-for="input-5">
              <b-form-input
                id="input-5"
                type="password"
                required
                placeholder="Enter Password"
                v-model="password"
              ></b-form-input>
            </b-form-group>
            <b-button variant="dark" type="submit" >SignUp</b-button>
          </b-form>
    </b-modal>
</template>

<script>
export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      password: '',
      email: ''
    }
  },
  methods: {
    signup () {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        email: this.email
      }
      this.$store.dispatch('signup', data)
      this.$refs['my-modal'].hide()
    }
  }

}
</script>

<style>

</style>
