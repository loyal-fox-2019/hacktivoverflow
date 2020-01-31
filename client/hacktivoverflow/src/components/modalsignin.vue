<template>
    <b-modal id="modal-2" title="Login" hide-footer ref="my-modal">
        <b-form @submit.prevent="signin">
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
            <b-form-group id="input-group-5" label="Password:" label-for="input-5">
              <b-form-input
                id="input-5"
                type="password"
                required
                placeholder="Enter Password"
                v-model="password"
              ></b-form-input>
            </b-form-group>
            <b-button variant="dark" type="submit" >SignIn</b-button>
          </b-form>
    </b-modal>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signin () {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('signin', payload)
    }
  }

}
</script>

<style>

</style>
