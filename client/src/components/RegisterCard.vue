<template>
  <div>
    <b-card class="mb-2 shadow-sm">
      <b-card-text class="text-left font-weight-bold">
        <b-form @submit.prevent="sendConfirmationEmail">
          <b-form-group id="input-name" label="Display Name" label-for="name">
            <b-form-input
              id="name"
              v-model="form.name"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-email" label="Email" label-for="email">
            <b-form-input
              id="email"
              v-model="form.email"
              type="email"
              required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="info" block size="sm">
            Sign up
          </b-button>
        </b-form>
      </b-card-text>
      <b-card-text class="text-muted text-left mt-4" style="font-size:10px;">
        By clicking “Sign up”, you agree to our terms of service, privacy policy
        and cookie policy
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        name: null,
        email: null
      }
    };
  },
  methods: {
    sendConfirmationEmail() {
      axios({
        method: "POST",
        url: `${this.$store.state.API}/users/register`,
        data: this.form
      })
        .then(({ data }) => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
